import express from "express";
import { APIResponse, APIResponseStatus } from "../models/api-response";
import Middleware from "./middleware-interface";

export default class ResponseAdapterMiddleware implements Middleware {
    constructor(
        private controllerFn: (req: express.Request) => Promise<APIResponse>
    ) {}

    handler = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const result: APIResponse = await this.controllerFn(req);
            if (result.status == APIResponseStatus.ERROR) res.statusCode = 500;
            if (result.status == APIResponseStatus.UNAUTHORIZED)
                res.statusCode = 401;
            res.json(result);
        } catch (err) {
            next(err);
        }
    };
}
