import Router from "express-promise-router";
import { tripRouteController } from "../controllers";

const router = new Router();

router.get("/", tripRouteController.list);
router.get("/:id", tripRouteController.getById);
router.post("/", tripRouteController.createTripRoute);
router.put("/:id", tripRouteController.updateTripRoute);
router.delete("/:id", tripRouteController.deletedTripRoute);

export default router;
