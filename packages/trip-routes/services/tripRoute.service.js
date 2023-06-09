/* eslint-disable no-useless-catch */
import { tripRoutes } from "../models";
// import axios from 'axios';

const createNewTripRoute = async (departureTime, arrivalTime, trip_id, coach_id, capacity) => {
  const seats = new Array(capacity).fill(false);
  try{
    const tripRoute = new tripRoutes({
      departureTime,
      arrivalTime,
      seats,
      trip_id,
      coach_id,
    });
    
    const newTripRoute = await tripRoute.save();
    
    return newTripRoute;
  }
  catch(error){
    throw(error);
  }
}

const getTripRoutes = async () => {
  try{
    const tripRouteList =  await tripRoutes.find();
    return tripRouteList;
  }
  catch(error){
    throw(error);
  }
}

export default {
  createNewTripRoute,
  getTripRoutes
};
