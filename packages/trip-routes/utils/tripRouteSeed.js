import { tripRoutes } from "../models";
import axios from 'axios';


export default async function tripRoutesSeed() {
  // ####### seed data for trip routes ######
  // delete old collection in database
  const drop = await tripRoutes.collection.drop();
  if (drop) {
    console.log("old trip routes collection was deleted");
  } else {
    console.log("error drop old trip route collections");
    return;
  }

  // seed data for coach
  const tripList = (await axios.get("http://localhost:8081/trip/?1000")).data.results;
  const coachList = (await axios.get("http://localhost:8083/coach/list")).data.coachList;
  const tripRoutesData = [];

  for (let i = 0; i < 15; i++) {
    const pickTrip = tripList[Math.floor(Math.random() * tripList.length)];
    const pickCoach = coachList[Math.floor(Math.random() * coachList.length)];
    const departureTime = Math.floor(Math.random() * 24);
    const arrivalTime = departureTime + pickTrip.duration / 60;

    const newTripRoute = {
      departureTime: `${departureTime}:00 ${new Date().toLocaleDateString("en-GB")}`,
      arrivalTime: `${arrivalTime}:00 ${new Date().toLocaleDateString("en-GB")}`,
      trip_id: pickTrip.id,
      coach_id: pickCoach.id,
      bookedSeat: new Array(pickCoach.capacity).fill(false)
    };

    tripRoutesData.push(newTripRoute);
  }

  try {
    await tripRoutes.insertMany(tripRoutesData);
    console.log("trip route collections was inserted");
  } catch (error) {
    console.log("error when seed data for trip route collections");
    console.error(error);
  }
}
