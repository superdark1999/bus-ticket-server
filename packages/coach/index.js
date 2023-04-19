import protoLoader from "@grpc/proto-loader";
import grpc from "grpc";
import connectMongoDB from "shared/lib/db/mongodb";
import {
  createCoach,
  deleteCoach,
  getCoach,
  getCoachList,
  updateCoach,
} from "./services/coach.service.js";

const packageDefinition = protoLoader.loadSync("./coach.proto");
const coachProto = grpc.loadPackageDefinition(packageDefinition);
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
};

bootstrap();
