import models from "../models";

const getTripRouteList = async () => {
  const tripRouteList = await models.trip_route.find({}, { _id: 1, origin: 1, destination: 1, duration: 1, price: 1 });
  console.log(tripRouteList);

  return tripRouteList;
};

const getTripRouteByID = async (_id) => {
  const tripRoute = await models.trip_route.findById({_id}, { _id: 1, origin: 1, destination: 1, duration: 1, price: 1 });
  console.log(tripRoute);

  return tripRoute;
};

const getTripRouteByStation = async(origin, destination) => {
  const query = {};
  if (origin) {
    query.origin = origin;
  }
  if (destination) {
    query.destination = destination;
  }

  const tripRouteList = await models.trip_route.find(query);
  console.log(tripRouteList);
  
  return tripRouteList;
}

export {
    getTripRouteList,
    getTripRouteByID,
    getTripRouteByStation
};
