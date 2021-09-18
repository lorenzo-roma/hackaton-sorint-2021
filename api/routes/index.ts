import express from "express";
import ValidateAuthMiddleware from "../middlewares/validate-auth-middleware";
import authRoutes from "./auth";
import tripRoutes from "./trip";
import shiftRoutes from "./shift";

const router = express.Router();
const validateMiddleware = new ValidateAuthMiddleware();

router.use("/auth", authRoutes);
router.use("/trip", validateMiddleware.handler, tripRoutes);
router.use("/shift", validateMiddleware.handler, shiftRoutes);

export default router;
