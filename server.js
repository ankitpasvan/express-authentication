
const express=require("express");

const mongoose=require("mongoose");
const cors = require("cors");
const app=express();
app.use(cors());
 require("dotenv").config();

const PORT=4000;
app.use(express.json());
 const connect=require("./config/database");

connect();
   
// route import and mount 

 const user=require("./routes/user");

app.use("/api/v1",user);

// activate the server
app.get("/",(req,res)=>{
    res.send("Server is running");
})
app.listen(PORT,()=>{
    
    console.log(`app is listening at ${PORT}`);
})