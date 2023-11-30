const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { log } = require("console")
dotenv.config()
let app = express()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongodb")
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000)