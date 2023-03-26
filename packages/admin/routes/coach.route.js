import Router from "express-promise-router";
import { coachController } from "../controllers";

const router = new Router();

router.get("/", coachController.list);
router.get("/:coach", coachController.getById);

export default router;
