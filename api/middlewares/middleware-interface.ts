import express from "express";

type MiddlewareHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

type ErrorMiddlewareHandler = (
  e: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export default interface Middleware {
  handler: MiddlewareHandler | ErrorMiddlewareHandler;
}
