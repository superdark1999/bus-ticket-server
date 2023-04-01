import { TripRoutes } from "../models";

const getTripRoutes = async (filter, options) => {
  const { results, ...others } = await TripRoutes.paginate(filter, options);

  return {
    results,
    ...others,
  };
};

const createTripRoute = async (data) => {
  const newTripRoute = await TripRoutes.create(data);
  return newTripRoute;
};

const updateTripRoute = async (tripRouteId, newData) => {
  const updatedTripRoute = await TripRoutes.findByIdAndUpdate(
    tripRouteId,
    newData,
    { new: true }
  );

  return updatedTripRoute;
};

const deleteTripRoute = async (tripRouteId) => {
  const deletedTripRoute = await TripRoutes.findByIdAndDelete(tripRouteId);

  return deletedTripRoute;
};

export default {
  getTripRoutes,
  createTripRoute,
  updateTripRoute,
  deleteTripRoute,
};
