import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter";
import handleError from "./middlewares/errorsMiddleware";
import kuboRouter from "./routers/kuboRouter";

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "development") {
    app.use(cors({ origin: "*" }));
    console.log("[server]: using cors");
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/kubo", kuboRouter);
app.use(handleError);

export default app;