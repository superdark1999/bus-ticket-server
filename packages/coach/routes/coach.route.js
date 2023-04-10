import Router from "express-promise-router";
import {
  getCoach,
  updateCoach,
  getCoachList,
  createCoach,
} from "../controllers";

const router = new Router();

router.get("/", getCoachList);
router.get("/:id", getCoach);
router.post("/", createCoach);
router.put("/:id", updateCoach);

export default router;
