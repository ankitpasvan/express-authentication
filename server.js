
const express=require("express");
const mongoose=require("mongoose");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT||4000;
app.use(express.json());
const {connect}=require("./config/database");
connect();

// route import and mount 

const user=require("./routes/user");
app.use("/api/v1",user);

// activate the server

app.listen(PORT,()=>{
    console.log(`app is listening at ${PORT}`);
})