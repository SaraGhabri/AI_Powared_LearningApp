import dotenv from "dotenv"
dotenv.config()


import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { error } from "console"
import connectDB from "../config/db.js";
import errorHandler from '../middleware/errorHandler.js'

//ES6 module __dirname fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//initialize express app
const app = express()

//connection to mongodb
connectDB()

//middlewares to handle cors
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,

    })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//a static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


//routes

app.unsubscribe(errorHandler);

//404 error
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
        statusCode : 404
    });

});

//starting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
        process.exit(1);
    });