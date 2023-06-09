import Router from "express-promise-router";
import tripRouteRouters from "./tripRoute.route";

const router = new Router();

router.use("/tripRoutes", tripRouteRouters);

export default router;