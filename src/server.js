const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config()

const port = process.env.PORT || 5000;


const dbConnection = async () =>{
    await mongoose.connect("mongodb://127.0.0.1:27017/projectTask")
            .then(()=>console.log("db connection good"))
            .catch(()=>console.log("faild to connect to db"))
}

// middlewars //

app.use(express.json());

const userRouter = require("./routes/user.router")
app.use(userRouter)


app.listen(port,()=>{
    dbConnection()
    console.log("running on port " + port)
})
