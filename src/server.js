const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config()

const port = process.env.PORT || 5000;


const dbConnection = async () =>{
    await mongoose.connect("mongodb://127.0.0.1:27017/projectTask")
            .then(()=>console.log("db connection good"))
            .catch(()=>console.log("faild to connect to db"))
}

// middlewars //

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// console.log(path.join(__dirname,"/uploads"))
app.use("/api/uploads",express.static("./src/uploads"))
const routes = require("./src/routes")
app.use("/api", routes)


app.listen(port,()=>{
    dbConnection()
    console.log("running on port " + port)
})
