const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const userRoutes = require("./routes/user")


app.use('/api/user', userRoutes);
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000)

