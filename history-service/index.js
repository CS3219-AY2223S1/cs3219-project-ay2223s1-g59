import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import historyRoutes from "./routes/historyRoutes.js"

let uri;

if (process.env.ENV == "PROD") {
    uri = process.env.DB_CLOUD_URI
} else if (process.env.DB_DOCKER_URI) {
    uri = process.env.DB_DOCKER_URI
} else {
    uri = process.env.DB_LOCAL_URI
}

mongoose
    .connect(uri)
    .then((x) => console.log(`History service - connected to MongoDB! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to MongoDB', err.reason))

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use("/", historyRoutes)

const PORT = process.env.PORT || 8004;
app.listen(PORT, () =>
  console.log(`History service listening on port ${PORT}`)
);

export default app