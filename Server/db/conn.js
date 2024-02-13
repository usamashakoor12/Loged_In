const mongoose = require("mongoose");


const DB='mongodb+srv://shakoorqariusama:H.Usama@mufood.hjxiq3d.mongodb.net/Authuser?retryWrites=true&w=majority'


mongoose.connect(DB,{
    useUniFiedTopology: true,
    useNewUrlParser: true
}).then(()=>{console.log("connected successfully");}).catch((err)=>{
    console.log(err);
})