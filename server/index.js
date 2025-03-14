require("dotenv").config();

const express=require('express');
const cors=require('cors');
const cookieParser=require("cookie-parser");

const app=express();
const PORT=process.env.PORT ||8000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const authRoutes=require('./Routes/authRoutes');
const bookRoutes=require('./Routes/bookRoutes');
const cartRoutes=require('./Routes/cartRoutes');
const profileRoutes=require('./Routes/profileRoutes');

app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
app.use("/Books",bookRoutes);
app.use("/cart",cartRoutes);

// // app.get("/",async(req,res)=>{
// //     const bookdata=await BooksInfo.find();
// //     return res.json(bookdata);
// // })

// // app.get("/Books/:type",async(req,res)=>{
// //     let type=req.params.type;
// //     const fictionalbookdata=await BooksInfo.find({BookType:type});
// //     return res.json(fictionalbookdata);
// // })

// // app.get("/cart/getitems",authenticate,async (req,res)=>{
    
// //     try{
// //         const user=await MERNUser.findOne({_id:req.user.id});
// //         if(!user){
// //           return res.status(401).json({message:"Unauthorised User!!"});
// //         }
// //         const ans=user.MyCart;
// //         res.status(200).json(ans);

// //     }catch(err){
// //         console.log("Error:",err);
// //         return res.status(500).json({message:"Server Error!!"});
// //     }
    
// // })

// // app.get("/logout",(req,res)=>{
// //     if(req.cookies.token){
// //         res.clearCookie('token');
// //     }
// //     return res.json({success:"Logged Out"});  
// // })

// // app.post("/additem",authenticate,async(req,res)=>{
// //     console.log(req.user);
// //     let id=req.user.id;
// //     let bookid=req.body.bookid;
// //     let user=await MERNUser.findOne({_id:id});
// //     if(!user){
// //         console.log(req.user);
// //         return res.status(401).json({message:"Unauthorised Aceess"});
// //     }
// //     let book=await BooksInfo.findOne({_id:bookid});
    
// //     if(book.SellerEmail==user.Email){
// //         return res.json({error:"Same user is trying to buy a book"});
// //     }
// //     let arr=user.MyCart;
// //     let idx=arr.findIndex((ele)=>ele._doc._id==bookid);
// //     if(idx===-1){
// //         user.MyCart.push({...book,count:1});
// //         await user.save();
// //     }
    
// //     return res.status(200).json({success:"Added"});
// // })

// // app.get("/getprofile/:id",async(req,res)=>{
// //     let id=req.params.id;
// //     if (id == "1") {
// //         return res.json({ error: 'Invalid user ID' });
// //     }
// //     if (mongoose.Types.ObjectId.isValid(id)) {
// //         const objectId =new mongoose.Types.ObjectId(id);
// //         let user=await MERNUser.findOne({_id:objectId});
// //         return res.json({FullName:user.FullName,Email:user.Email,BooksBought:user.BooksBought,MoneyEarned:user.MoneyEarned,BooksSold:user.BooksSold.length});
// //     } else {
// //         return res.json({error:"Error"});
// //     }

    
// // })

// // app.post("/handlenewuser",async(req,res)=>{
// //    let body=req.body;
// //    if(!body.FullName || !body.Email || !body.Password){
// //     return res.json("null");
// //    }
// //    await MERNUser.create({FullName:body.FullName,Email:body.Email,Password:body.Password})
// //    .then(()=>{
// //     res.status(200).json({ message: "User registered successfully" });
// //    }).catch((err)=>{
// //     console.log("Error:",err);
// //     res.status(500).json({message:"Server Error"});
// //    })
// // })

// // app.post("/handlelogin" ,async(req,res)=>{
// //     try{
// //         let body=req.body;
// //         if(!body.Email || !body.Password){
// //             return res.json({error:"No such user"});
// //         }
// //         let user=await MERNUser.findOne({Email:body.Email ,Password:body.Password});
// //         if(!user){
// //             return res.json({error:"No such user"});
// //         }
// //         const userdata={id:user._id,Email:user.Email};

// //         const token=jwt.sign(userdata,process.env.SECRET_KEY,{ expiresIn: "1h" });

// //         res.json({token}); 

       

// //     }catch(err){
// //         console.log("Error:",err);
// //         res.status(500).json({message:"Server Error"});
// //     }
    
// // })

// // app.get("/cart/remove/:userid/:bookname",authenticate,async(req,res)=>{
// //     let id=req.user.id;
// //     let bookname=req.params.bookname;

// //     let user=await MERNUser.findOne({_id:id});
// //     let prevcart=user.MyCart;
// //     let newcart=prevcart.filter((c)=>c._doc.BookName!=bookname);
// //     user.MyCart=newcart;
// //     await user.save();
// //     return;
// // })

// // app.get("/cart/increment/:userid/:bookname",authenticate,async(req,res)=>{
// //     let id=req.params.userid;
// //     let bookname=req.params.bookname;

// //     let user=await MERNUser.findOne({_id:id});
// //     let prevcart=user.MyCart;
// //     for(let i=0;i<prevcart.length;i++){
// //         if(prevcart[i]._doc.BookName===bookname){
// //                 prevcart[i].count+=1;
// //             break;
// //         }
// //     }
// //     user.MyCart=prevcart;
// //     await user.save();
// //     return;

// // })

// app.post("/cart/handlecheckout/:id",authenticate,async(req,res)=>{
//     let id=req.params.id;
//     if(id==="1"){
//         return res.json({error:"invalid user"});
//     }
//     if(mongoose.Types.ObjectId.isValid(id)){
//         let user=await MERNUser.findOne({_id:id});
        
        
//         for(let i=0;i<user.MyCart.length;i++){
//             let seller=await MERNUser.findOne({Email:user.MyCart[i]._doc.SellerEmail});
//             seller.BooksSold.push(user.MyCart[i]);
//             seller.MoneyEarned+=user.MyCart[i]._doc.Price;
//             await seller.save();
//             await BooksInfo.deleteOne({_id:user.MyCart[i]._doc._id});
//         }

//         user.BooksBought+=user.MyCart.length;
//         user.MyCart=[];
//         await user.save();
//         return;
//     }
//     return;
// })

// // app.get("/booksold/:id",async(req,res)=>{
// //     let id=req.params.id;
// //     if(mongoose.Types.ObjectId.isValid(id)){
// //         let user=await MERNUser.findOne({_id:id});
// //         return res.json(user.BooksSold);
// //     }
// //     return res.json({error:"Some Error"});
// // })

// // app.post("/booksell/:id",async(req,res)=>{
// //     let id=req.params.id;
// //     let body=req.body;
// //     if(mongoose.Types.ObjectId.isValid(id)){
// //         let user=await MERNUser.findOne({_id:id});
// //         await BooksInfo.create({BookName:body.BookName,AuthorName:body.AuthorName,Price:body.Price,YearsUsed:body.YearsUsed,BookType:body.BookType,SellerEmail:user.Email});
// //     }

// //     return res.redirect("http://localhost:3000/home");
// // })

// // app.get("/bookpending/:id",async (req,res)=>{
// //     let id=req.params.id;
// //     if(mongoose.Types.ObjectId.isValid(id)){
// //         let user=await MERNUser.findOne({_id:id});
// //         if(user){
// //             let books=await BooksInfo.find({SellerEmail:user.Email});
// //             return res.json(books);
// //         }else{
// //             return res.json({error:"No Such User"});
// //         }
// //     }else{
// //         return res.json({error:"Not Valid Id"});
// //     }
// // })

app.listen(PORT,()=>console.log("Server running at PORT:",PORT));

