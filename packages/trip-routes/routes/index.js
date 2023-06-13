import Router from "express-promise-router";
import tripRouteRouters from "./tripRoute.route";

const router = new Router();

router.use("/trip-route", tripRouteRouters);

export default router;
