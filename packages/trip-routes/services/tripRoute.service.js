/* eslint-disable no-useless-catch */
import { tripRoutes } from "../models";
import axios from 'axios';

const createNewTripRoute = async (departureTime, arrivalTime, trip_id, coach_id, bookedSeat) => {
  try{
    const tripRoute = new tripRoutes({
      departureTime,
      arrivalTime,
      bookedSeat,
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
    const tripList = await axios.get('http://localhost:8081/trip/?1000');
    const coachList = await axios.get('http://localhost:8083/coach/list')

    const linkedTrips = tripRouteList.reduce((acc, item) => {
      const trip = tripList.data.results.find(t => t.id === item.trip_id);
      const coach = coachList.data.coachList.find(c => c.id === item.coach_id);
      if (trip && coach) {
        acc.push({
          id: item.id,
          coach_id: item.coach_id,
          trip_id: item.trip_id,
          departureTime: item.departureTime,
          arrivalTime: item.arrivalTime,
          bookedSeat: item.bookedSeat,
          origin: trip.origin,
          destination: trip.destination,
          duration: trip.duration,
          price: trip.price,
          model: coach.model,
          capacity: coach.capacity,
          registrationNumber: coach.registrationNumber});
      }
      return acc;
    }, []);

    return linkedTrips;
  }
  catch(error){
    throw(error);
  }
}

const updateTripRoute = async (tripRouteId, newData) => {
  const updatedTripRoute = await tripRoutes.findByIdAndUpdate(tripRouteId, newData, {
    new: true,
  });

  return updatedTripRoute;
};

const deleteTripRoute = async (tripRouteId) => {
  const deletedTripRoute = await tripRoutes.findByIdAndDelete(tripRouteId);

  return deletedTripRoute;
};


export default {
  createNewTripRoute,
  getTripRoutes,
  updateTripRoute,
  deleteTripRoute,
};
