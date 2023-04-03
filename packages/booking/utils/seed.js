import { Model } from "mongoose";
import models from "../models";

export default async function seed() {
  // trip_route
  // delete old collection in database
  const drop = await models.trip_route.collection.drop();
  if(drop){
    console.log('old trip route collection was deleted');
  }
  else{
    console.log('error drop old trip route collection')
    return;
  }

  // seed data for trip_route
  const tripRoutes = [
    {
      origin: "Sài Gòn",
      destination: "Quảng Trị",
      duration: 20,
      price: 700000,
    },
    {
      origin: "Sài Gòn",
      destination: "Vũng Tàu",
      duration: 2,
      price: 700000,
    },
    {
      origin: "Đồng Nai",
      destination: "Sài Gòn",
      duration: 2,
      price: 700000,
    },
    {
      origin: "Bình Dương",
      destination: "Sài Gòn",
      duration: 2,
      price: 700000,
    },
    {
      origin: "Vũng Tàu",
      destination: "Sài Gòn",
      duration: 2,
      price: 700000,
    },
  ];

  await models.trip_route
    .insertMany(tripRoutes)
    .then(() => console.log("trip route collections was inserted"))
    .catch((err) => console.error(err));
}
