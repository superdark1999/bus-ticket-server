/* eslint-disable no-useless-catch */
import { tripRoutes } from "../models";
// import axios from 'axios';

const createNewTripRoute = async (departureTime, arrivalTime, trip_id, coach_id, capacity) => {
  const seats = new Array(capacity);
  for (let i = 0; i < capacity; i++) {
    seats[i] = false;
  }
  console.log("seats", seats);
  try{
    const tripRoute = new tripRoutes({
      departureTime,
      arrivalTime,
      bookedSeat: seats,
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
