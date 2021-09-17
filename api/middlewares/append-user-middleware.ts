import express from "express";
import AuthResult from "../models/auth-result";
import AuthServiceInterface from "../services/auth/auth-service-interface";
import Middleware from "./middleware-interface";

export default class AppendUserMiddleware implements Middleware {
  constructor(private authService: AuthServiceInterface) {}

  handler = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const verifyResponse = await this.authService.verifyToken(token);
      if (verifyResponse.status === AuthResult.SUCCESS)
        req.user = verifyResponse.data;
    }
    next();
  };
}
