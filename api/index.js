const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser());
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")


app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })})
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000)

