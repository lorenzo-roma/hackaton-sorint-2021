import express from "express";
import { APIResponse, APIResponseStatus } from "../models/api-response";
import UnauthorizedError from "../models/unauthorized-error";
import Middleware from "./middleware-interface";

export default class ErrorHandlerMiddleware implements Middleware {
  handler = async (
    e: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (e instanceof UnauthorizedError) {
      const response = APIResponse.Unauthorized();
      res.statusCode = 403;
      res.json(response);
      return;
    }
    const response = APIResponse.Error(e.message);
    res.statusCode = 500;
    res.json(response);
    console.log(`Error: ${e.message}`);
  };
}
