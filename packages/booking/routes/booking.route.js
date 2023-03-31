import Router from "express-promise-router";
import { bookingController } from "../controllers";

const router = new Router();

router.get("/", bookingController.list);
router.get("/:bookingId", bookingController.getById);

export default router;
