const express=require("express")
const Login =require("../models/login.js")
const bcrypt = require('bcrypt');
route=express.Router();
route.use(express.json())
const cors = require("cors")
route.use(cors({
    origin: "*",
}))

// const secret="ghg"


const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

/* route.post('/login',async (req,res)=>{
    try{
       console.log(req.body)
        
    let user = await login.findOne({email:req.body.email})
    console.log(user,1)
    if(!user){
       return  res.status(409).json({
            status:'failure',
            message:'user dont exist plss singup'
        })
    }
    console.log("ppppp")

    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: user.email
      }, secret);


     res.json({
        status: "Success",
        message: "Login Succesful",
        token:token
    })
    
   
 } catch(e){
     res.status(401).json({
        status: "Failed",
        message: e.message
    })
    }

 }) */
 route.get("/",(req,res)=>{
    res.send("ok")
 })
 route.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    const userData = await Login.findOne({email:email});
    
    console.log(userData)
    if (userData) {
        // is await requred for bcrypt???
        let result = await bcrypt.compare(password, userData.password);
        if (result) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: userData.email,
            },
                process.env.SECRET
            );
            res.status(200).json({
                Status: "ok",
                token: token,
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: "Wrong Password",
            });
        }
    }
    else {
        res.status(400).json({
            status: "failed",
            message: "No user Found pls register ",
        });
    }
});




module.exports = route;