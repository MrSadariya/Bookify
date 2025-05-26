const { Book } = require('lucide-react');
const mongoose=require('./db');

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
    },
    bookCoverURL:{
        type:String
    },
    BookDescription:{
        type:String
    }

});

const BooksInfo=mongoose.model('BooksInfo',BooksSchema);

module.exports=BooksInfo;