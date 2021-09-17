export enum APIResponseStatus {
  SUCCESS = "Success",
  ERROR = "Error",
  UNAUTHORIZED = "Unauthorized",
}

export class APIResponse {
  static Success(data?: any): APIResponse {
    return new APIResponse(APIResponseStatus.SUCCESS, data);
  }

  static Error(data?: any): APIResponse {
    return new APIResponse(APIResponseStatus.ERROR, data);
  }

  static Unauthorized(data?: any): APIResponse {
    return new APIResponse(APIResponseStatus.UNAUTHORIZED, data);
  }

  private constructor(public status: APIResponseStatus, public data?: any) {}
}
