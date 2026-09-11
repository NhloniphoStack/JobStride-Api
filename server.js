import dotenv from 'dotenv';
import express from 'express';
import { apiRouter } from './routes/api.js';
import { authRouter } from './routes/auth.js'
import { jobsRouter } from './routes/jobs.js';
import session from 'express-session';
import cors from 'cors';


dotenv.config()



const PORT = 8000

const app = express()

const allowedOrigins = ["https://jobstride.netlify.app", "http://localhost:5173"]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())



app.use(session({
    secret: process.env.SUPER_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false
    }
}))



app.get('/api', (req, res) => {
    res.json({message: "its fine"})
})

app.use('/api/jobs', jobsRouter)




app.use('/api', apiRouter)

app.use('/api/auth', authRouter)

app.use((req, res) => {
    res.status(404).json({
        message: 'Invalid path'
    })
})


app.listen(PORT, () => console.log(`Connected at Port: ${PORT}`))

