import Router from "express-promise-router";
import { tripController } from "../controllers";

const router = new Router();

router.get("/", tripController.list);
router.get("/:id", tripController.getById);
router.post("/", tripController.createTrip);
router.put("/:id", tripController.updateTrip);
router.delete("/:id", tripController.deletedTrip);

export default router;
