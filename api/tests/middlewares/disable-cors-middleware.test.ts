import express from "express";
import DisableCorsMiddleware from "../../middlewares/disable-cors-middleware";

let nextFn = {} as express.NextFunction;
let res = {} as express.Response;
let req = {} as express.Request;
let middlewareTested: DisableCorsMiddleware;

beforeEach(() => {
  res = {} as express.Response;
  req = {} as express.Request;
  nextFn = jest.fn();
  middlewareTested = new DisableCorsMiddleware();
});

describe("Disable cors middleware tests", () => {
  test("It should add cors headers to responses", async () => {
    res.setHeader = jest.fn();
    const req = { headers: {} } as express.Request;
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalled();
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      "*"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Credentials",
      "true"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Methods",
      "*"
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Headers",
      "*"
    );
  });
});
