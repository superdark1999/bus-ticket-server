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
const port = process.env.PORT;
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
    `localhost:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start();
      console.log(`Server running at grpc://localhost:${port}`);
    }
  );
};

bootstrap();
