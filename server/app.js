import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";
const app = express();

dotenv.config({ path: "./config/config.env" });

// user login register cookie generate . to use this cookie
app.use(cookieParser());
app.use(express.json());

// types of data to know 
app.use(express.urlencoded({ extended: true }));

// connect backend to frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter,);
app.use("/api/v1/task", taskRouter);



dbConnection();

app.use(errorMiddleware);

export default app;