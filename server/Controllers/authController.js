const User=require("../Model/UserModel");
const jwt=require("jsonwebtoken");
const {sendEMail} =require("./sendEmail");

const handleSignup=async (req,res)=>{
   let body=req.body;
   if(!body.FullName || !body.Email || !body.Password){
    return res.status(401).json({message:"Incomplete Information!!"});
   }

   const user=await User.findOne({Email:body.Email});
   if(user && user.isVerified){
    return res.status(401).json({message:"User already exists!!"});
   }

   const verificationOTP=Math.floor(100000+ Math.random()*900000).toString();

   if(user){
        user.FullName=body.FullName;
        user.verificationOTP=verificationOTP;
        user.Password=body.Password;
        await user.save();
   }else{
      const newuser=new User({
        FullName:body.FullName,
        Email:body.Email,
        Password:body.Password,
        verificationOTP:verificationOTP
       })   
    
       await newuser.save();

   }

   await sendEMail(body.Email,verificationOTP);

   return res.status(200).json({message:`OTP sent to Your Email!!`});



//    await User.create({FullName:body.FullName,Email:body.Email,Password:body.Password}).then(()=>{
//     return res.status(200).json({message: "User registered successfully" });
//    }).catch((err)=>{
//     console.log("Error:",err);
//     res.status(500).json({message:"Server Error"});
//    })

}


  

const confirmSignUp=async (req,res)=>{
    try{
        let body=req.body;
        if(!body.FullName || !body.Email || !body.Password){
            return res.status(401).json({message:"Incomplete Information!!"});
        }

        const user=await User.findOne({Email:body.Email});
        if(!user){
            return res.status(401).json({message:"No Such user!!"});
        }
        if(user && user.isVerified){
            return res.status(401).json({message:"User already exists!!"});
        }

        if(user.verificationOTP===body.userOTP){
            user.isVerified=true;
            await user.save();
            return res.status(200).json({message:"User registered succesfully!!"});
        }else{
            return res.status(401).json({message:"OTP doesn't match"});
        }

    }catch(err){
        console.log("Error:",err);
        res.status(500).json({message:"Server Error"});
    }

}

const handleLogin=async(req,res)=>{
    try{
        let body=req.body;
        if(!body.Email || !body.Password){
            return res.status(401).json({message:"Invalid Information!!"});
        }
        let user=await User.findOne({Email:body.Email ,Password:body.Password,isVerified:true});
        
        if(!user){
            return res.status(401).json({message:"No such user or invalid credentials"});
        }
        const userdata={id:user._id,Email:user.Email};

        const token=jwt.sign(userdata,process.env.SECRET_KEY,{ expiresIn: "1h" });

        res.status(200).json({token,message:"Logged in successfully!!"}); 

    }catch(err){
        console.log("Error:",err);
        res.status(500).json({message:"Server Error"});
    }


}

module.exports={handleSignup,handleLogin,confirmSignUp};