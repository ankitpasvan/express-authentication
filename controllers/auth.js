
const bcrypt= require("bcrypt");

 const User=require("../models/User.js");
 const jwt=require("jsonwebtoken");
const { options } = require("../routes/user.js");
 require("dotenv").config();

// signup route handler
exports.signup=async(req,res)=>{
    try{
        // get data 
        const {name,email,password,role}=req.body;
        // check if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:`User already Exists`,
            })
        }
        // secure password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'error in hashing function'
            })
        }
        // create entry for user
        const user=await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:`User created Successfully`
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'user can not be registered,plese try again leter',
        });

    }
}

// login handler
exports.login=async(req,res)=>{
    try{
        // data featch
        const{email,password}=req.body;
        // validition on email and password
        if(!email||!password){
            return  res.status(400).json({
                success:false,
                message:'please fill all the detail carefully',
            })
        }
        // check for register user
        const user=await User.findOne({email});
        // if not a register user
        if(!user){
            return res.status(401).json({
                success:false,
                message:'user is not register',
            })
        }

        const payload={
            email:user.email,
            id:user._id,
            role:user.role,
        }
        // verify password and generate a jwt token
        if(await bcrypt.compare(password,user.password)){    // password verify ke liye bcrypt.compare
            // password match
            let token=jwt.sign(payload,
                            process.env.JWT_SECRET,{
                                expiresIn:"2h",
                            }
            )
            console.log(user);
            user.token=token;
            console.log(user);
            user.password=undefined;
            console.log(user);
            const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"user logged in successfully",
            });


        }else{
            // password do not match
            return res.status(403).json({
                success:false,
                message:"Password incorrect",
            })
        }
    }
    catch(err){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'login failure',
        })

    }
}