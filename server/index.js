require("dotenv").config();

const express=require('express');
const cors=require('cors');
const cookieParser=require("cookie-parser");

const app=express();
const PORT=process.env.PORT ||8000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
  return res.json({message:"Hello from Server"});
})

const authRoutes=require('./Routes/authRoutes');
const bookRoutes=require('./Routes/bookRoutes');
const cartRoutes=require('./Routes/cartRoutes');
const profileRoutes=require('./Routes/profileRoutes');

app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
app.use("/Books",bookRoutes);
app.use("/cart",cartRoutes);

app.listen(PORT,()=>console.log("Server running at PORT:",PORT));
