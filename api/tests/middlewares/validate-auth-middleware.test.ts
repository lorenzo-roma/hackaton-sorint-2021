import express from "express";
import ValidateAuthMiddleware from "../../middlewares/validate-auth-middleware";
import UnauthorizedError from "../../models/unauthorized-error";
import User from "../../models/user";

let nextFn = {} as express.NextFunction;
let res = {} as express.Response;
let req = {} as express.Request;
let middlewareTested: ValidateAuthMiddleware;

beforeEach(() => {
  req = { headers: {} } as express.Request;
  res = {} as express.Response;
  nextFn = jest.fn();
  middlewareTested = new ValidateAuthMiddleware();
});

describe("Validate auth middleware tests", () => {
  test("If user is present in request, it should call next", async () => {
    req.user = new User("test", "password", "lorenzo", "Romagnoni", "+39 3402192392", false,"1");
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalled();
  });

  test("If user is not present in request, it should throw unauthorized error", async () => {
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalledWith(new UnauthorizedError());
  });
});
