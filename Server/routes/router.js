const express = require("express");
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const router = new express.Router();


//for user registration API

router.post("/register", async (req, res) => {
  const { fname, email, Password, cPassword } = req.body;

  if (!fname || !email || !Password || !cPassword) {
    //agr user koi field empty rakhy
    res.status(422).json({ error: "fill all the details" }); //to error thow kry ga
  }

  try {
    const preuser = await userdb.findOne({ email: email }); //for chak matching email

    if (preuser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (Password !== cPassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Match" });
    } else {
      const finalUser = new userdb({
        fname,
        email,
        Password,
        cPassword, //for user Register in DB
      });

      // here Password hashing

      const storeData = await finalUser.save(); //done data store in DB
      // console.log(storeData);
      res.status(201).json({ status: 201, storeData });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("Catch block error");
  }
});

// for user Login Api
router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, Password } = req.body;

  if (!email || !Password) {
    res.status(422).json({ error: "fill all detail" });
  }
  try {
    const userValid = await userdb.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(Password, userValid.Password);

      if (!isMatch) {
        res.status(422).json({ error: "invalid details" });
      } else {

        // token generate
        const token = await userValid.generateAuthtoken(); //function define in userScema

        // console.log(token);

                //cookie generate
        res.cookie("usercookie",token,{       //cookie ko token ki value di
             expires: new Date(Date.now()+9000000),        //cookie expiry time 15 mint
             httpOnly:true   
        });

        const result = {
                userValid,
                token
        }
        res.status(201).json({status:201,result})
      }
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("Catch block");
  }
});

// user valid for dashboard page
router.get("/validuser",authenticate, async(req, res)=>{
  try {
    const ValidUserOne = await userdb.findOne({_id:req.userId});
    res.status(201).json({status:201,ValidUserOne})
    
  } catch (error) {
    res.status(401).json({status:401,error})
    
  }
});

//User LogOut 
router.get("/logout",authenticate, async (req, res)=>{
  try {
    //user k DB k main kafi sa tokens hon gy usi user k jo valid token hoga wo remove krna hoga
    req.rootUser.tokens =    req.rootUser.tokens.filter((curelem)=>{
        return  curelem.token  !== req.token
    });
    //remove Cokie
    res.clearCookie("usercookie",{path:"/"});

    req.rootUser.save();

    res.status(201).json({status:201})
     
  } catch (error) {
    res.status(401).json({sattus:401,error} )
  }
})

module.exports = router;
