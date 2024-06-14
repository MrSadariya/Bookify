const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log("MongoDB(MERNUser) Connected!!");
}).catch((err)=>console.log("Error:",err));

const MERNUserSchema=new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    MyCart:{
        type:Array
    },
    BooksBought:{
        type:Number,
        default:0
    },
    MoneyEarned:{
        type:Number,
        default:0
    },
    BooksSold:{
        type:Number,
        default:0
    }
});

const MERNUser=mongoose.model('MERNUser',MERNUserSchema);

module.exports=MERNUser;