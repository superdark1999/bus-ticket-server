import { tickets } from "../models";

export default async function seed() {
  // ####### seed data for tickets ######
  // delete old collection in database
  const drop = await tickets.collection.drop();
  if (drop) {
    console.log("old tickets collection was deleted");
  } else {
    console.log("error drop old tickets collection");
    return;
  }

  // seed data for trip_route
  const ticketsData = [
    {
      seatNumber: 1,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "1",
    },
    {
      seatNumber: 2,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "2",
    },
    {
      seatNumber: 3,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "3",
    },
    {
      seatNumber: 4,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "4",
    },
    {
      seatNumber: 5,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "5",
    },
    {
      seatNumber: 6,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "6",
    },
    {
      seatNumber: 7,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "7",
    },
    {
      seatNumber: 8,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "8",
    },
    {
      seatNumber: 9,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "9",
    },
    {
      seatNumber: 10,
      bookingDate: Date.now(),
      status: "Còn hạn",
      tripRoute_id: "10",
      user_id: "10",
    },
  ];

  try{
    await tickets.insertMany(ticketsData);
    console.log("trip route collections was inserted");
  }
  catch(error){
    console.log("error when seed data for tickets collection");
    console.error(error);
  }
}
