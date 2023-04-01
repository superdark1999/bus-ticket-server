import Router from "express-promise-router";
import coachRouters from "./coach.route";
import tripRouteRouters from "./trip-route.route";

const router = new Router();

router.use("/coach", coachRouters);
router.use("/trip-routes", tripRouteRouters);

export default router;
