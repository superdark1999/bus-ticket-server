import Router from "express-promise-router";
import coachRouters from "./coach.route";

const router = new Router();

router.use("/coach", coachRouters);

export default router;
