import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-routes.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use('/api/user', userRouter)

/*
import { createUser } from './controller/user-controller.js';

const router = express.Router()

// Controller will contain all the User-defined Routes
router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
}) 
*/

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`User service listening on port ${PORT}`)
);

export default app;