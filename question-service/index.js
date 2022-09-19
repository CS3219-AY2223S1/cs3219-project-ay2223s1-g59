import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import questionRoutes from "./route/question-route.js";

// const uri =
//   process.env.ENV == "PROD"
//     ? process.env.DB_CLOUD_URI
//     : "mongodb://localhost:27017/";

const uri = process.env.DB_CLOUD_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection succeeded!");
  })
  .catch((error) => {
    console.error("Databse connection failed!");
    throw new Error(error);
  });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //for frontend
app.options("*", cors());
app.use("/questions", questionRoutes).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(8000, () => console.log("question-service listening on port 8000"));
