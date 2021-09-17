import express from "express";
import errorHandlerMiddleware from "./middlewares/error-handler-middleware";
import MiddlewareProvider from "./middlewares/provider";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(MiddlewareProvider.getDisableCorsMiddleware().handler);
app.use(MiddlewareProvider.getAppendUserMiddleware().handler);
app.use("/", routes);
app.use(MiddlewareProvider.getErrorHandlerMiddleware().handler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port " + port));
