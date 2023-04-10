import { Trip } from "../models";

const getTrip = async (filter, options) => {
  const { results, ...others } = await Trip.paginate(filter, options);

  return {
    results,
    ...others,
  };
};

const createTrip = async (data) => {
  const newTrip = await Trip.create(data);
  return newTrip;
};

const updateTrip = async (tripId, newData) => {
  const updatedTrip = await Trip.findByIdAndUpdate(tripId, newData, {
    new: true,
  });

  return updatedTrip;
};

const deleteTrip = async (tripId) => {
  const deletedTrip = await Trip.findByIdAndDelete(tripId);

  return deletedTrip;
};

export default {
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
};
