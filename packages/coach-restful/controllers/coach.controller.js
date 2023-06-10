import pick from "shared/lib/utils/pick";
import catchAsync from "shared/lib/utils/catchAsync";
import coachService from "../services/coach.service";

const createNewCoach = async (req, res) => {
  try{
    const {model, capacity, registrationNumber} = req.body;
    const newCoach = await coachService.createNewCoach(model, capacity, registrationNumber);

    res.status(200).json({newCoach});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const getCoachList = async (req, res) => {
  try{
    const coachList = await coachService.getCoachList();
    res.status(200).json({coachList})
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const deleteCoach = async (req, res) => {
  try{
    const id = req.params.id;
    await coachService.deleteCoach(id);

    res.status(200).json({message: "success"});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const updateCoach = async (req, res) => {
  try{
    const {id, model, capacity, registrationNumber} = req.body;
    const newCoach = await coachService.updateCoach(id, model, capacity, registrationNumber);

    res.status(200).json({newCoach});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

const getCoachById = async (req, res) => {
  try{
    const coachId = req.params.coachId;
    const coach = await coachService.getCoachById(coachId);

    res.status(200).json({coach});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

export const coachController = {
  createNewCoach,
  getCoachList,
  deleteCoach,
  updateCoach,
  getCoachById
};
