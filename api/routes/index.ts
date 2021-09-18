import express from "express";
import ValidateAuthMiddleware from "../middlewares/validate-auth-middleware";
import authRoutes from "./auth";
import tripRoutes from "./trip";

const router = express.Router();
const validateMiddleware = new ValidateAuthMiddleware();

router.use("/auth", validateMiddleware.handler, authRoutes);
router.use("/trip", validateMiddleware.handler, tripRoutes);

export default router;
