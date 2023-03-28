import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const authRouter = new Router();

authRouter.post("/register", authController.create);
authRouter.post("/login", authController.userLogin);
authRouter.post("/logout", authController.userLogout);
authRouter.post("/forgot-password", authController.userForgotPassword);
authRouter.post("/change-password", authController.userChangePassword);

export default authRouter;