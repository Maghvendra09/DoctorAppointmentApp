import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
dotenv.config();

connectDB()


const app = express()



app.use(express.json()) 
app.use(morgan('dev'))
import router from "./routes/user.route.js";
import routers from "./routes/admin.route.js";
import routing from "./routes/doctor.route.js";
app.use('/api/v1/user', router)
app.use('/api/v1/admin', routers)
app.use('/api/v1/doctor', routing)

const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white);
})