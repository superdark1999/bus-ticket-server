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

const deleteCoach = async (id) => {
  try{
    const result = await Coach.findByIdAndRemove(id);
    return result;
  }
  catch(error){
    throw(error);
  }
}

const updateCoach = async (id, model, capacity, registrationNumber) => {
  try{
    const coach = {model, capacity, registrationNumber};
    const newCoach = await Coach.findByIdAndUpdate(id, coach, {new: true});

    return newCoach;
  }
  catch(error){
    throw(error);
  }
}

export default {
  createNewCoach,
  getCoachList,
  deleteCoach,
  updateCoach
};
