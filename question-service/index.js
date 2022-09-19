import express from "express";
import cors from "cors";
import questionRoutes from "./route/question-route.js";

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
