import express from "express";
import AppendUserMiddleware from "../../middlewares/append-user-middleware";
import AuthResult from "../../models/auth-result";
import User from "../../models/user";
import AuthServiceInterface from "../../services/auth/auth-service-interface";

let nextFn = {} as express.NextFunction;
let res = {} as express.Response;
let req = {} as express.Request;
let middlewareTested: AppendUserMiddleware;
let mockService: AuthServiceInterface;

beforeEach(() => {
  req = { headers: {} } as express.Request;
  res = {} as express.Response;
  nextFn = jest.fn();
  mockService = {} as AuthServiceInterface;
  middlewareTested = new AppendUserMiddleware(mockService);
});

describe("Check user middleware tests", () => {
  test("If no auth header is present, user object should not be appended to request", async () => {
    mockService.verifyToken = jest.fn();
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalled();
    expect(req.user).toBeUndefined();
  });

  test("If auth header is present, and token is valid, user object should be appended to request", async () => {
    req.headers["authorization"] = "Bearer token";
    const user: User = new User("test", "passowrd", "1");
    mockService.verifyToken = jest.fn(async () => {
      return { status: AuthResult.SUCCESS, data: user };
    });
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalled();
    expect(req.user).toBe(user);
  });

  test("If auth header is present, and token is not valid, user object should be undefined", async () => {
    req.headers["authorization"] = "Bearer token";
    const user: User = new User("test", "passowrd", "1");
    mockService.verifyToken = jest.fn(async () => {
      return { status: AuthResult.ERROR_VALIDATING_TOKEN };
    });
    await middlewareTested.handler(req, res, nextFn);
    expect(nextFn).toBeCalled();
    expect(req.user).toBe(undefined);
  });
});
