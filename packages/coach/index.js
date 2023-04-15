import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import {
  createCoach,
  getCoach,
  getCoachList,
  updateCoach,
  deleteCoach,
} from "./services/coach.service.js";
const packageDefinition = protoLoader.loadSync("./coach.proto");
const coachProto = grpc.loadPackageDefinition(packageDefinition);
import connectMongoDB from "shared/lib/db/mongodb";
// import { connectConsumer } from "./kafka/kafka";
const server = new grpc.Server();
const bootstrap = () => {
  connectMongoDB();

  server.addService(coachProto.coach.CoachService.service, {
    createCoach,
    getCoachList,
    getCoach,
    updateCoach,
    deleteCoach,
  });

  server.bindAsync(
    "localhost:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log("Server running at grpc://localhost:50051");
    }
  );

  // connectConsumer();
};

bootstrap();
