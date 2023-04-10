import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
const packageDefinition = protoLoader.loadSync("../coach.proto");
const coachProto = grpc.loadPackageDefinition(packageDefinition).CoachService;

const client = new coachProto(
  "localhost:8081",
  grpc.credentials.createInsecure()
);

export const createCoach = (req, res) => {
  client.createCoach(req.body, (err, response) => {
    if (err) {
      res.status(grpc.status.INTERNAL).send(err);
      return;
    }
    res.send(response);
  });
};

export const getCoachList = (req, res) => {
  client.getCoachList(req.query, (err, response) => {
    if (err) {
      res.status(grpc.status.INTERNAL).send(err);
      return;
    }
    res.send(response);
  });
};
export const getCoach = (req, res) => {
  const id = req.params.id;

  client.getCoach({ id }, (err, response) => {
    if (err) {
      res.status(err.code).send(err.message);
      return;
    }

    res.send(response);
  });
};
export const updateCoach = (req, res) => {
  const id = req.params.id;

  client.updateCoach({ id, ...req.body }, (err, response) => {
    if (err) {
      res.status(err.code).send(err.message);
      return;
    }

    res.send(response);
  });
};
