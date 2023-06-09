import Router from "express-promise-router";
import { tripRoutesController } from "../controllers";

const router = new Router();

// create new coach
router.post("/new-tripRoute", tripRoutesController.createNewTripRoute);


// get coach list
router.get("/list-tripRoute", tripRoutesController.getTripRouteList);

export default router;
