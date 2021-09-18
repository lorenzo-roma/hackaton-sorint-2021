import express from "express";
import UnauthorizedError from "../models/unauthorized-error";
import Middleware from "./middleware-interface";

export default class ValidateAuthMiddleware implements Middleware {
  handler = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const user = req["user"];
    if (!user) next(new UnauthorizedError());
    next();
  };
}
