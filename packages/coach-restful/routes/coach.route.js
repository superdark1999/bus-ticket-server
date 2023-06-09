import Router from "express-promise-router";
import { coachController } from "../controllers";

const router = new Router();

// create new coach
router.post("/new-coach", coachController.createNewCoach);

// get coach list
router.get("/list", coachController.getCoachList);

// update coach
router.patch("/update", coachController.updateCoach);

// delete coach
router.delete("/delete/:id", coachController.deleteCoach)

export default router;
