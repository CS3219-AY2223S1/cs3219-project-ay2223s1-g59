import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import mongoose from 'mongoose';
import 'dotenv/config'

const uri = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI
mongoose
    .connect(uri)
    .then((x) => console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to MongoDB', err.reason))

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use('/', (req, res) => {
    res.send('Hi')
})

const httpServer = createServer(app)
const PORT = process.env.PORT || 8003

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
