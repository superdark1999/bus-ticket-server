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

export const coachController = {
  createNewCoach,
  getCoachList,
};
