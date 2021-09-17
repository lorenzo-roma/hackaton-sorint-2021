import express from "express";
import ErrorHandlerMiddleware from "../../middlewares/error-handler-middleware";
import ValidateAuthMiddleware from "../../middlewares/validate-auth-middleware";
import { APIResponse } from "../../models/api-response";
import UnauthorizedError from "../../models/unauthorized-error";
import User from "../../models/user";

let nextFn = {} as express.NextFunction;
let res = {} as express.Response;
let req = {} as express.Request;
let middlewareTested: ErrorHandlerMiddleware;

beforeEach(() => {
  req = { headers: {} } as express.Request;
  res = {} as express.Response;
  nextFn = jest.fn();
  middlewareTested = new ErrorHandlerMiddleware();
});

describe("Error handler middleware tests", () => {
  test("Check response in case of generic error", async () => {
    const errorMessage: string = "message";
    const error: Error = new Error(errorMessage);
    const responseInCaseOfError = APIResponse.Error(errorMessage);
    const mockFn = jest.fn();
    res.json = mockFn;
    await middlewareTested.handler(error, req, res, nextFn);
    expect(mockFn.mock.calls[0][0]).toStrictEqual(responseInCaseOfError);
    expect(nextFn).not.toBeCalled();
  });

  test("Check response in case of unauthorized error", async () => {
    const error: UnauthorizedError = new UnauthorizedError();
    const responseInCaseOfUnauthorized = APIResponse.Unauthorized();
    const mockFn = jest.fn();
    res.json = mockFn;
    await middlewareTested.handler(error, req, res, nextFn);
    expect(mockFn.mock.calls[0][0]).toStrictEqual(responseInCaseOfUnauthorized);
    expect(nextFn).not.toBeCalled();
  });
});
