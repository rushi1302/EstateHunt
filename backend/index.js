import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { signup } from './controllers/auth.controller.js'
const app = express();
app.use(express.json())
dotenv.config()


const URL = process.env.MONGO_URI
mongoose.connect(URL).then(() => {
    console.log("Connected to mongodb")
}).catch((err) => {
    console.log(err);
})


app.listen(3000, () => {
    console.log("Hello world");
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)


// to use import we use package.json - "type":"module"