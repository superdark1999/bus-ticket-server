import { Coach } from "../models";

const createNewCoach = async (model, capacity, registrationNumber) => {
  try{
    const coach = new Coach({
      model, 
      capacity, 
      registrationNumber
    });
    
    const newCoach = await coach.save();
    
    return newCoach;
  }
  catch(error){
    throw(error);
  }
}

const getCoachList = async () => {
  try{
    const coachList =  await Coach.find();
    return coachList;
  }
  catch(error){
    throw(error);
  }
}

export default {
  createNewCoach,
  getCoachList
};
