import { Coach } from "../models";

export function createCoach(call, callback) {
  const coachData = call.request;

  const coach = new Coach(coachData);

  coach.save((err, doc) => {
    if (err) {
      callback(err, null);
      return;
    }

    callback(null, doc.toObject());
  });
}

export function getCoachList(call, callback) {
  const page = call.request.page || 1;
  const limit = call.request.limit || 10;

  const options = {
    page,
    limit,
  };

  console.log(
    "🚀 ~ file: coach.service.js:24 ~ getCoachList ~ options:",
    Coach.paginate()
  );
  Coach.paginate({}, options, (err, result) => {
    console.log(
      "🚀 ~ file: coach.service.js:32 ~ Coach.paginate ~ result:",
      result
    );
    if (err) {
      console.log(
        "🚀 ~ file: coach.service.js:29 ~ Coach.paginate ~ err:",
        err
      );
      callback(err, null);
      return;
    }

    const response = {
      coaches: result.docs.map((doc) => doc.toObject()),
      page: result.page,
      limit: result.limit,
      total: result.totalDocs,
      totalPages: result.totalPages,
    };

    callback(null, response);
  });
}

export function getCoach(call, callback) {
  const { id } = call.request;

  Coach.findById(id, (err, doc) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (!doc) {
      callback(
        { code: grpc.status.NOT_FOUND, message: "Coach not found" },
        null
      );
      return;
    }

    callback(null, doc.toObject());
  });
}

export function updateCoach(call, callback) {
  const { id, ...updateData } = call.request;

  Coach.findByIdAndUpdate(id, updateData, { new: true }, (err, doc) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (!doc) {
      callback(
        { code: grpc.status.NOT_FOUND, message: "Coach not found" },
        null
      );
      return;
    }

    callback(null, doc.toObject());
  });
}
