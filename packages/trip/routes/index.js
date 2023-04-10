import Router from "express-promise-router";
import tripRouteRouters from "./trip.route";

const router = new Router();

router.use("/trip", tripRouteRouters);

export default router;
