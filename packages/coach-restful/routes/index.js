import Router from "express-promise-router";
import coachRouteRouters from "./coach.route";

const router = new Router();

router.use("/coach", coachRouteRouters);

export default router;
