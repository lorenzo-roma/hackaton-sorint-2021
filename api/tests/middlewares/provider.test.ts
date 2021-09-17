import AppendUserMiddleware from "../../middlewares/append-user-middleware";
import DisableCorsMiddleware from "../../middlewares/disable-cors-middleware";
import ErrorHandlerMiddleware from "../../middlewares/error-handler-middleware";
import MiddlewareProvider from "../../middlewares/provider";

describe("Provide middleware instances", () => {
  test("Provide valid append user middleware", () => {
    const appendUserMiddleware: AppendUserMiddleware =
      MiddlewareProvider.getAppendUserMiddleware();
    expect(appendUserMiddleware).toBeTruthy();
    expect(appendUserMiddleware).toBeInstanceOf(AppendUserMiddleware);
  });

  test("Provide always the same instance of append user middleware", () => {
    const appendUserMiddleware: AppendUserMiddleware =
      MiddlewareProvider.getAppendUserMiddleware();
    const secondAppendUserMiddleware: AppendUserMiddleware =
      MiddlewareProvider.getAppendUserMiddleware();
    expect(appendUserMiddleware).toBe(secondAppendUserMiddleware);
  });

  test("Provide valid disable cors middleware", () => {
    const disableCorsMiddleware: DisableCorsMiddleware =
      MiddlewareProvider.getDisableCorsMiddleware();
    expect(disableCorsMiddleware).toBeTruthy();
    expect(disableCorsMiddleware).toBeInstanceOf(DisableCorsMiddleware);
  });

  test("Provide always the same instance of disable cors middleware", () => {
    const disableCorsMiddleware: DisableCorsMiddleware =
      MiddlewareProvider.getDisableCorsMiddleware();
    const secondDisableCorsMiddleware: DisableCorsMiddleware =
      MiddlewareProvider.getDisableCorsMiddleware();
    expect(disableCorsMiddleware).toBe(secondDisableCorsMiddleware);
  });

  test("Provide valid error handler middleware", () => {
    const errorHandlerMiddleware: ErrorHandlerMiddleware =
      MiddlewareProvider.getErrorHandlerMiddleware();
    expect(errorHandlerMiddleware).toBeTruthy();
    expect(errorHandlerMiddleware).toBeInstanceOf(ErrorHandlerMiddleware);
  });

  test("Provide always the same instance of error handler middleware", () => {
    const errorHandlerMiddleware: ErrorHandlerMiddleware =
      MiddlewareProvider.getErrorHandlerMiddleware();
    const secondErrorHandlerMiddleware: ErrorHandlerMiddleware =
      MiddlewareProvider.getErrorHandlerMiddleware();
    expect(errorHandlerMiddleware).toBe(secondErrorHandlerMiddleware);
  });
});
