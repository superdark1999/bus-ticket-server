import { Coach } from "../models";

export function createCoach(call, callback) {
  const coachData = call.request;
  const coach = new Coach(coachData);

  coach
    .save()
    .then((doc) => {
      const newCoach = { ...doc.toObject() };
      newCoach.id = newCoach?._id?.toString();
      delete newCoach._id;
      delete newCoach.__v;
      callback(null, newCoach);
    })
    .catch((err) => {
      callback(err, null);
    });
}

export function getCoachList(call, callback) {
  const page = call.request.page || 1;
  const limit = call.request.limit || 10;

  const options = {
    page,
    limit,
  };

  Coach.paginate({}, options, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    const response = {
      coaches: result.docs.map((doc) => {
        const newCoach = { ...doc.toObject() };
        newCoach.id = newCoach?._id?.toString();
        delete newCoach._id;
        delete newCoach.__v;
        return newCoach;
      }),
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

  Coach.findById(id)
    .then((doc) => {
      if (!doc) {
        throw { code: grpc.status.NOT_FOUND, message: "Coach not found" };
      }
      const newCoach = { ...doc.toObject() };
      newCoach.id = newCoach?._id?.toString();
      delete newCoach._id;
      delete newCoach.__v;
      callback(null, newCoach);
    })
    .catch((err) => {
      callback(err, null);
    });
}

export function updateCoach(call, callback) {
  const { id, ...updateData } = call.request;

  Coach.findByIdAndUpdate(id, updateData, { new: true })
    .then((doc) => {
      if (!doc) {
        throw { code: grpc.status.NOT_FOUND, message: "Coach not found" };
      }
      const newCoach = { ...doc.toObject() };
      newCoach.id = newCoach?._id?.toString();
      delete newCoach._id;
      delete newCoach.__v;
      callback(null, newCoach);
    })
    .catch((err) => {
      callback(err, null);
    });
}
export function deleteCoach(call, callback) {
  const { id } = call.request;

  Coach.findByIdAndDelete(id)
    .then((doc) => {
      if (!doc) {
        throw { code: grpc.status.NOT_FOUND, message: "Coach not found" };
      }

      callback(null, { message: "Coach deleted successfully" });
    })
    .catch((err) => {
      callback(err, null);
    });
}
