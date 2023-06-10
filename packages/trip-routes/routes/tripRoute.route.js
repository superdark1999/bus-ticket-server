import Router from "express-promise-router";
import { tripRoutesController } from "../controllers";

const router = new Router();

router.post("/new-tripRoute", tripRoutesController.createNewTripRoute);

router.get("/list-tripRoute", tripRoutesController.getTripRouteList);

router.put("/:id", tripRoutesController.updateTripRoute);

router.delete("/:id", tripRoutesController.deleteTripRoute);

router.get("/search", tripRoutesController.searchTripRoute);

export default router;
