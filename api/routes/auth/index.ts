import express from "express";
import ResponseAdapterMiddleware from "../../middlewares/response-adapter-middleware";
import ControllerProvider from "../../controllers/provider";
import AuthController from "../../controllers/auth-controller";

const router = express.Router();

const authController: AuthController = ControllerProvider.getAuthController();

router.post(
    "/login",
    new ResponseAdapterMiddleware(authController.performLogin).handler
);
router.post(
    "/signup",
    new ResponseAdapterMiddleware(authController.performSignup).handler
);

export default router;
