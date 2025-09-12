const mongoose=require('mongoose');
require("dotenv").config();

const connect =()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("DB connection is successful");
    })
    .catch((err)=>{
        console.log("DB connection issue");
        console.error(err);
        console.log(error);
        process.exit(1);
    })
}

module,exports= {connect};