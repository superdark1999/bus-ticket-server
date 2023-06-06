import Router from "express-promise-router";
import { coachController } from "../controllers";

const router = new Router();

// create new coach
router.post("/new-coach", coachController.createNewCoach);


// get coach list
router.get("/list", coachController.getCoachList);

export default router;
