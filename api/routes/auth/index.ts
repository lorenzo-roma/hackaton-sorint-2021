import express from "express";
import ResponseAdapterMiddleware from "../../middlewares/response-adapter-middleware";
import ControllerProvider from "../../controllers/provider";
import AuthController from "../../controllers/auth-controller";
import ValidateAuthMiddleware from "../../middlewares/validate-auth-middleware";

const router = express.Router();

const authController: AuthController = ControllerProvider.getAuthController();
const validateMiddleware = new ValidateAuthMiddleware();

router.post(
    "/login",
    new ResponseAdapterMiddleware(authController.performLogin).handler
);
router.post(
    "/signup",

    new ResponseAdapterMiddleware(authController.performSignup).handler
);
router.get(
    "/me",
    validateMiddleware.handler,
    new ResponseAdapterMiddleware(authController.performMe).handler
);

export default router;
