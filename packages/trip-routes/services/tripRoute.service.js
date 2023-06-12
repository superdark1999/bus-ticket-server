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
    const tripList = await axios.get(`${process.env.TRIP_SERVICE_URL}/trip/?1000`);
    const coachList = await axios.get(`${process.env.COACH_SERVICE_URL}/coach/list`)

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

const searchTripRoute = async (origin, destination, departureDate) => {
  try{
    const tripRouteList = await tripRoutes.find({departureTime: {$regex: departureDate, $options: 'i'}});
    const result = [];
    for(const tripRoute of tripRouteList){
      const trip = (await axios.get(`${process.env.TRIP_SERVICE_URL}/trip/${tripRoute.trip_id}`)).data.trip;
      if(trip.origin.includes(origin) && trip.destination.includes(destination)){
        const coach = ((await axios.get(`${process.env.COACH_SERVICE_URL}/coach/id/${tripRoute.coach_id}`))).data.coach;
        
        const newResult = {
          id: tripRoute.id,
          departureTime: tripRoute.departureTime,
          arrivalTime: tripRoute.arrivalTime,
          bookedSeat: tripRoute.bookedSeat,
          trip_id: tripRoute.trip_id,
          origin: trip.origin,
          destination: trip.destination,
          duration: trip.duration,
          price: trip.price,
          coach_id: tripRoute.coach_id,
          model: coach.model,
          capacity: coach.capacity,
          registrationNumber: coach.registrationNumber
        }

        result.push(newResult);
      }
    }

    console.log(tripRouteList);
    return result;
  }
  catch(error){
    throw(error);
  }
}

const getTripRouteById = async (id) => {
  try{
    const tripRoute = await tripRoutes.findById(id);
    
    if(!tripRoute){
      return;
    }

    const coach = ((await axios.get(`${process.env.COACH_SERVICE_URL}/coach/id/${tripRoute.coach_id}`))).data.coach;
    const trip = (await axios.get(`${process.env.TRIP_SERVICE_URL}/trip/${tripRoute.trip_id}`)).data.trip;

    // create full data and return
    const result = {
      id: tripRoute.id,
          departureTime: tripRoute.departureTime,
          arrivalTime: tripRoute.arrivalTime,
          bookedSeat: tripRoute.bookedSeat,
          trip_id: tripRoute.trip_id,
          origin: trip.origin,
          destination: trip.destination,
          duration: trip.duration,
          price: trip.price,
          coach_id: tripRoute.coach_id,
          model: coach.model,
          capacity: coach.capacity,
          registrationNumber: coach.registrationNumber
    }
    return result;
  }
  catch(error){
    throw(error);
  }
}


export default {
  createNewTripRoute,
  getTripRoutes,
  updateTripRoute,
  deleteTripRoute,
  searchTripRoute,
  getTripRouteById
};
