import express from "express";
import Middleware from "./middleware-interface";

export default class DisableCorsMiddleware implements Middleware {
  handler = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  };
}
