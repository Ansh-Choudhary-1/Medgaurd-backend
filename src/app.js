import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(express.json({limit:"10mb"}))

import patientRoutes from './routes/patient.routes.js';

app.use("/api/v1/patient",patientRoutes)


export{app}