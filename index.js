import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/users.route.js";
import postRoute from "./routes/posts.route.js";


// middlewares
const app = express();
dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(5000, () => {
  connect();
  console.log("Backend is running");
});
