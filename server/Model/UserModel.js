const mongoose=require('./db');

const MERNUserSchema=new mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
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
        type:Array,
    },
    verificationOTP:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    profilePicURL:{
        type:String
    },
    ResetVerificationOTP:{
        type:String
    }
});

const MERNUser=mongoose.model('MERNUser',MERNUserSchema);

module.exports=MERNUser;