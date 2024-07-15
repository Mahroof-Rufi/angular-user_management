import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


import userRoute from './routes/userRoutes.js'
import adminRoute from './routes/adminRoutes.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()
const app = express()
const port = 7000


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.use(
    cors({
      origin: ["http://localhost:4200"],
      methods: ["GET","POST","PUT","DELETE"],
      credentials: true,
    })
);


app.use('/',userRoute)
app.use('/admin',adminRoute)


app.listen(port,()=>console.log("server started"));

