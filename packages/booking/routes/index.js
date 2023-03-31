import Router from "express-promise-router";
import bookingRouters from "./booking.route";

const router = new Router();

router.use("/booking", bookingRouters);

export default router;
