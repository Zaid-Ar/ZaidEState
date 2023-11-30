const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(express.json())
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000)

