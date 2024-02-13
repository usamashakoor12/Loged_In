const mongoose = require("mongoose");
const validator = require("validator");     //npm i validator
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const keysecret = "UsamaShakoorMoizShakoorSaqibShak"

const userShema = new mongoose.Schema({
    fname:{
        type:String,
        required: true,
        trim: true    //for extra spaces removeable
    },
    email:{
        type:String,
        required:true,
        unique: true,   //for unique email id
        validate(value){          //validate func ma value parameter ha jo user ki email ko
            if (!validator.isEmail(value)) {       //chack kary ga k email valid ha k nhi
                throw new Error("Not Valid Email")
            }
        }
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    cPassword:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

});



// hash Password before save DB
// use pre method of mongodb
 
userShema.pre("save",async function(next){

         // jb be ham password ko update krna chahy tb hi change ho or koi na change ke saaky
    if (this.isModified("Password")) {    
        this.Password = await bcrypt.hash(this.Password,12);
        this.cPassword = await bcrypt.hash(this.cPassword,12);
    }


    next()
});

// token generate
userShema.methods.generateAuthtoken = async function(){
    try {
        let token23 = jwt.sign({_id:this._id},keysecret,{      // token takes payload and secretKey
            expiresIn:"1d"           // Provide expire time limite
        });
    
        this.tokens = this.tokens.concat({token:token23});
        await this.save();        //token save
        return token23;
        
    } catch (error) {
        resizeBy.status(422).json(error)
    }
    
}

// create model
const userdb = mongoose.model("users",userShema);


module.exports = userdb;