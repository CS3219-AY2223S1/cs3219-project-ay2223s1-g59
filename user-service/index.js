import express from 'express'
import cors from 'cors'
import userRouter from './routes/user-routes.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())
app.use('/', userRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
  console.log(`User service listening on port ${PORT}`)
)

export default app