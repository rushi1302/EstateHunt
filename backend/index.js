import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'

import cookieParser from 'cookie-parser'
const app = express();
app.use(express.json())
app.use(cookieParser())
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE", "PATCH"]
}))
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

// to handle error we are making this middleware.

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

// to use import we use package.json - "type":"module"