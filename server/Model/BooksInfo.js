const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log("MongoDB(BooksInfo) Connected!!");
}).catch((err)=>console.log("Error:",err));

const BooksSchema=new mongoose.Schema({
    BookName:{
        type:String,
        required:true
    },
    AuthorName:{
        type:String,
    },
    Price:{
        type:Number,
        required:true
    },
    YearsUsed:{
        type:Number
    },
    SellerEmail:{
        type:String,
        required:true
    },
    BookType:{
        type:String,
        required:true
    }

});

const BooksInfo=mongoose.model('BooksInfo',BooksSchema);

module.exports=BooksInfo;