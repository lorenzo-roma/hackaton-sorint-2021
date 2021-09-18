import express from "express";
import ResponseAdapterMiddleware from "../../middlewares/response-adapter-middleware";
import { APIResponse } from "../../models/api-response";

let res = {} as express.Response;
let req = {} as express.Request;
let nextFn = {} as express.NextFunction;
let middlewareTested: ResponseAdapterMiddleware;
let mockControllerFn: (req: express.Request) => Promise<APIResponse>;

beforeEach(() => {
  res = {} as express.Response;
  req = {} as express.Request;
  nextFn = jest.fn();
  mockControllerFn = jest.fn();
  middlewareTested = new ResponseAdapterMiddleware(mockControllerFn);
});

describe("Json handler middleware tests", () => {
  test("If controller functions succeds, it should return json response", async () => {
    res.json = jest.fn();
    mockControllerFn = jest.fn(async () => {
      return APIResponse.Success();
    });
    middlewareTested = new ResponseAdapterMiddleware(mockControllerFn);
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).not.toBeCalled();
    expect(mockControllerFn).toBeCalled();
    expect(res.json).toBeCalled();
  });

  test("If controller functions throws error, it should call next middleware with error", async () => {
    res.json = jest.fn();
    mockControllerFn = jest.fn(async () => {
      throw new Error();
    });
    middlewareTested = new ResponseAdapterMiddleware(mockControllerFn);
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalled();
    expect(res.json).not.toBeCalled();
  });

  test("If controller functions succeds with error response, it should set status code to 500", async () => {
    res.json = jest.fn();
    mockControllerFn = jest.fn(async () => APIResponse.Error());
    middlewareTested = new ResponseAdapterMiddleware(mockControllerFn);
    await middlewareTested.handler(req, res, nextFn);
    expect(res.statusCode).toBe(500);
  });

  test("If controller functions succeds with unauthorized response, it should set status code to 401", async () => {
    res.json = jest.fn();
    mockControllerFn = jest.fn(async () => APIResponse.Unauthorized());
    middlewareTested = new ResponseAdapterMiddleware(mockControllerFn);
    await middlewareTested.handler(req, res, nextFn);
    expect(res.statusCode).toBe(401);
  });
});
