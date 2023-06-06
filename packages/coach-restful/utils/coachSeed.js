import { Coach } from "../models";

export default async function coachSeed() {
  // ####### seed data for coaches ######
  // delete old collection in database
  const drop = await Coach.collection.drop();
  if (drop) {
    console.log("old coaches collection was deleted");
  } else {
    console.log("error drop old coaches collection");
    return;
  }

  // seed data for coach
  const coachesData = [
    {
      model: "Giường nằm",
      capacity: 24,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Ghế ngồi",
      capacity: 40,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Phòng nằm",
      capacity: 16,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Giường nằm",
      capacity: 24,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Ghế ngồi",
      capacity: 40,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Phòng nằm",
      capacity: 16,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },{
      model: "Giường nằm",
      capacity: 24,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Ghế ngồi",
      capacity: 40,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Phòng nằm",
      capacity: 16,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },{
      model: "Giường nằm",
      capacity: 24,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Ghế ngồi",
      capacity: 40,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Phòng nằm",
      capacity: 16,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },{
      model: "Giường nằm",
      capacity: 24,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Ghế ngồi",
      capacity: 40,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
    {
      model: "Phòng nằm",
      capacity: 16,
      registrationNumber: `74F1-${Math.round(Math.random()*100000)}`
    },
  ];

  try{
    await Coach.insertMany(coachesData);
    console.log("coach collections was inserted");
  }
  catch(error){
    console.log("error when seed data for coach collections");
    console.error(error);
  }
}
