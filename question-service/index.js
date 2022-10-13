import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import questionRoutes from "./route/question-route.js";
import { uri } from "./common/constants.js"
import { seedQuestionDatabaseIfEmpty } from "./questionSeeder.js"

mongoose
    .connect(uri)
    .then((x) => console.log(`Question service - connected to MongoDB! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to MongoDB for Question service', err.reason))

if (process.env.DB_DOCKER_URI || process.env.DB_LOCAL_URI) {
    // seed database if mongo docker is empty. note that this is an async function, not sure if await is needed
    seedQuestionDatabaseIfEmpty()
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); //for frontend
app.options("*", cors());
app.use("/questions", questionRoutes);

const PORT = process.env.PORT || 8002;
app.listen(PORT, () =>
    console.log(`Question service listening on port ${PORT}`)
);

export default app