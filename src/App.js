import React,{useContext, useEffect,useState} from "react";
import {Routes,Route,NavLink,useParams} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Components/Navbar";
import './Components/navstyle.css';
import Dashboard from "./Components/Dashboard";
import Bookbox from "./Components/Bookbox";
// import SignUp from "./Components/SignUp";
import 'font-awesome/css/font-awesome.min.css';
import {UserContext} from './Contexts/UserContext';
import Profile1 from "./Components/Profile1";
import NotLoggedinPage from "./Components/NotLoggedinPage";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookOpen} from '@fortawesome/free-solid-svg-icons';
import Cartbox from "./Components/Cartbox";



const Home=()=>{
    
    const userdata=useContext(UserContext);
    const [bookdata,setbookdata]=useState([]);

    useEffect(()=>{
     axios.get(`http://localhost:8000`).then((res)=>{
        setbookdata(res.data)});
    },[])

    return(<div className="books-container">
        {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
    </div>);
}

const MainHome=()=>{
    return(<div className="homepage-main">
        
        <div className="start">
            <div className="intro">
                <div className="heading"><h1>Sell Books & Magazine Online</h1></div>
                <div className="description">Bookify is a indian online website for books, and magazines. We facilitate the sale of books, and magazines by connecting sellers with buyers all around the India. What are you waiting for? Sign up today and take the first steps to selling on Bookify!
           </div>
           <div style={{width:"10vw",height:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"brown",color:"white",borderRadius:"1rem",textDecoration:"none"}}><NavLink className="link" to="/signup">Sign Up</NavLink></div>
            </div>

            <div className="logo" style={{fontSize:"2.5rem",color:"black",fontWeight:"bolder",display:"flex",flexDirection:'column',alignItems:"center"}}>
            <FontAwesomeIcon icon={faBookOpen} size={"2x"} style={{color: "black",}}  />
                <h1 style={{color:"black"}}>Bookify</h1>
            </div>

            
            <div className="types types-img">
                
            </div>
            
        </div>

        <div className="detail-home">
            <div className="text-contain">
            <div className="type-text">Welcome to our book exchange platform, where book lovers unite to buy and sell their beloved stories! Whether you're looking to declutter your shelves or find a new adventure, you're in the right place. Sell your gently loved books to someone who will cherish them just as much as you did, or browse our diverse selection to discover your next literary obsession. Join our community today and let the stories continue to inspire and connect us all.</div>
            <div style={{display:"flex",flexDirection:"row",height:"2rem",width:"100%",alignItems:"center",justifyContent:"space-evenly"}}> <div style={{width:"6vw",height:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"brown",color:"white",borderRadius:"1rem",textDecoration:"none",display:"inline",marginLeft:"0.5rem",marginRight:"0.5rem"}}><NavLink style={{color:"white"}} className="link" to="/login">Login</NavLink></div>   <div style={{width:"8vw",height:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"brown",color:"white",borderRadius:"1rem",textDecoration:"none",display:"inline",paddingLeft:"1rem",marginLeft:"0.5rem"}}><NavLink style={{color:"white"}}className="link" to="/signup">Sign Up</NavLink></div>
            </div>
            </div>
        <div className="types" style={{color:"black"}}>
                <div className="row">
                    <div className="fiction real-fiction" style={{color:"white"}}>Fiction</div>
                    <div className="non-fiction real-nonfiction" style={{color:"white"}}>Non-Fiction</div>
                </div>

                <div className="row">
                    <div className="educational real-educational" style={{color:"white"}}>Educational</div>
                    <div className="magazine real-magazine" style={{color:"white"}}>Magazines</div>
                </div>
            </div>

        </div>

        <div className="mainhome-footer">
            <h1 style={{alignSelf:"center"}}>Footer</h1>
        </div>

    </div>)
}

const Profile=()=>{
    
    const userdata=useContext(UserContext);
    const [profiledata,setprofiledata]=useState(null);
    const [BooksSold,setBooksSold]=useState(0);
    const [AmountEarned,setAmountEarned]=useState(0);
    const [BooksBought,setBooksBought]=useState(0);

    useEffect(()=>{
        axios.get(`http://localhost:8000/getprofile/${userdata.id}`)
        .then((res)=>{
            if(!res.data.error){
                setprofiledata(res.data);
                setBooksSold(res.data.BooksSold);
                setBooksBought(res.data.BooksBought);
                setAmountEarned(res.data.MoneyEarned);
            }
        });
    },[userdata.id])
     
    return(<div className="profilediv">
       <div className="profile-main">
        <div className="profile-photo"></div>
        <div className="user-detail">
            {profiledata===null?<span></span>:<h1>{profiledata.FullName}</h1>}
            {profiledata===null?<span></span>:<p>{profiledata.Email}</p>}

            <div className="user-bookcount">
                <div className="bookcount-div"> <div style={{fontWeight:"500"}}>Books Sold</div> <div style={{fontWeight:"bold",fontSize:"3.5rem"}}>{BooksSold}</div> </div>
                <div className="bookcount-div"> <div style={{fontWeight:"500"}}>Amount Earned</div> <div style={{fontWeight:"bold",fontSize:"3.5rem"}}>$ {AmountEarned}</div></div>
                <div className="bookcount-div"> <div style={{fontWeight:"500"}}>Books Bought</div> <div style={{fontWeight:"bold",fontSize:"3.5rem"}}>{BooksBought}</div></div>
            </div>
        </div>

        
       </div>
    </div>);
    
}

const SignUp=()=>{
    return (
        <div className="signup-box">
            <div >
            <form className="signup-main" method="post" action="http://localhost:8000/handlenewuser">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Your Full Name" name="FullName"></input>
                <input type="text" placeholder="Enter Your Email" name="Email"></input>
                <input type="password" placeholder="Enter Your Password" name="Password"></input>
                <button type="submit">Add Account</button>
                </form>
                <div style={{textAlign:"center" ,marginTop:"1rem",color:"black",fontSize:"1.2rem"}}>Already have an account ? <a style={{color:"black"}} href={`http://localhost:3000/login`}>Login</a></div>
            </div>
        </div>
    );
}

const LoginPage=()=>{
    return(<div className="signup-box">
         <div >
            <form className="signup-main" method="post" action="http://localhost:8000/handlelogin">
                <h1>Login</h1>
                <input type="text" placeholder="Enter Your Email"name="Email"></input>
                <input type="password" placeholder="Enter Your Password" name="Password"></input>
                <button type="submit">Login</button>
                </form>
                <div style={{textAlign:"center" ,marginTop:"1rem",color:"black",fontSize:"1.2rem"}}>Don't have an account ? <a style={{color:"black"}} href={`http://localhost:3000/signup`} >SignUp</a></div>
            </div>

    </div>)
}

const Cart=()=>{
    
    const userdata=useContext(UserContext);
    const [cart,setcart]=useState([]);
    const [items,setitems]=useState(0);
    const [bill,setbill]=useState(0);
    

    function handleCheckout(){
        axios.post(`http://localhost:8000/cart/handlecheckout/${userdata.id}`).catch((err)=>console.log(err));
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/cart/${userdata.id}`)
        .then((res)=>{
            if(!res.data.error){
                setcart(res.data);
                setitems(res.data.reduce((a,book)=>{
                  if(book.count){
                    return a+Number(book.count);
                  }else{
                    return a+1;
                  }
                },0));
                setbill(res.data.reduce((a,book)=>{
                   return a+Number(book._doc.Price);
                },0));
            }
            
        })
    },)


    // return (
    //     <div>
    //         <h1 style={{textAlign:"center", color:"black"}}>Your Cart</h1>
    //         <div className="books-container">
    //         {userdata.id==="1"?<h1>No User</h1>:cart.map((book)=><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
    //         </div>
            
    //     </div>
    // );
    return(<div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
    <div style={{minHeight:"calc(100vh - 60px)",width:"70vw",display:"flex",flexDirection:"column",alignItems:"center",color:"white"}}>
        <h1 style={{color:"white",marginTop:"1rem"}}>Your Orders</h1>
        {cart.map((book)=><Cartbox bookid={book._doc._id} key={book._doc._id} BookName={book._doc.BookName} AuthorName={book._doc.AuthorName} Price={book._doc.Price} YearsUsed={book._doc.YearsUsed} count={book.count}/>)}
    </div>

    <div style={{color:"black",width:"15vw",backgroundColor:"white",height:"45vh",borderRadius:"0.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",border:"1px solid black",right:"5vw",position:"fixed"}} >
        <div style={{marginTop:"1rem"}}><h2>Cart Summary</h2></div>
        <div style={{height:"80%",width:"70%",display:"flex",flexDirection:"column",alignItems:"flex-start",marginTop:"1rem"}}>
        <div style={{width:"100%",display:"flex",flexDirection:"row"}}><div style={{width:"90%"}}>Total Items</div> <div>{items}</div> </div>
        <div style={{width:"100%",display:"flex",flexDirection:"row"}}> <div style={{width:"90%"}}>GST Tax</div>  <div>0</div> </div>
        <div style={{width:"100%",display:"flex",flexDirection:"row"}}> <div style={{width:"90%"}}>Discount</div>  <div> 0</div> </div>
        <br></br>
        <div style={{height:"2rem",width:"100%",display:"flex",alignItems:"center",flexDirection:"row",backgroundColor:"silver",color:"black",borderRadius:"0.2rem",fontWeight:"bold"}}> <div style={{width:"90%",marginLeft:"0.5rem"}}>Total Bill</div>  <div style={{marginRight:"0.5rem"}}>${bill}</div> </div>
        <div style={{width:"100%",display:"flex",flexDirection:"row",marginTop:"1rem"}}> <input type="text" style={{width:"100%",height:"1.5rem",paddingLeft:"0.75rem"}} placeholder="Coupen Code"></input> </div>
        <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"0.5rem"}}><button style={{height:"1.75rem",width:"50%",backgroundColor:"black",color:"white",borderRadius:"0.5rem",border:"none"}}>Apply</button></div>
        
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}><button onClick={handleCheckout} style={{width:"80%",height:"2rem",borderRadius:"0.5rem",border:"none",backgroundColor:"green",color:"white",marginBottom:"1rem"}}>CheckOut</button></div>

    </div>
    </div>);
}


const FictionalPage=()=>{

    const [bookdata,setbookdata]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/Books/Fictional").then((res)=>setbookdata(res.data)).catch((err)=>console.log(err));
    },[])

    return(<div className="books-container">
    {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
</div>);
}

const NonFictionalPage=()=>{

    const [bookdata,setbookdata]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/Books/NonFictional").then((res)=>setbookdata(res.data)).catch((err)=>console.log(err));
    },[])

    return(<div className="books-container">
    {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
</div>);
}

const Educational=()=>{

    const [bookdata,setbookdata]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/Books/Educational").then((res)=>setbookdata(res.data)).catch((err)=>console.log(err));
    },[])

    return(<div className="books-container">
    {bookdata.map((book) =><Bookbox bookid={book._id} key={book._id} BookName={book.BookName} AuthorName={book.AuthorName} Price={book.Price} YearsUsed={book.YearsUsed}/>)}
</div>);
}

const SellBook=()=>{
    
    const userdata=useContext(UserContext);

    return(<div className="sellbookdiv">
        <form action={`http://localhost:8000/booksell/${userdata.id}`} method="post">
            <div>
            <label>Book Name</label>
            <input type="text" name="BookName" placeholder="Type Book Name" required></input>
            </div>

            <div>
            <label>AuthorName</label>
            <input type="text" name="AuthorName" placeholder="Type Author's Name" required></input> 
            </div>

            <div>
            <label>Price</label>
            <input type="number" name="Price"  placeholder="e.g. $200 "required></input>
            </div>

            <div>
            <label>Years Used</label>
            <input type="number" name="YearsUsed" placeholder="e.g. 2 (in Years)" required></input> 
            </div>

            <div>
            <label>Book Type</label>
            <select name="BookType">
                  <option value="Fictional">Fictional</option>
                  <option value="NonFictional">NonFictional</option>
                  <option value="Educational">Educational</option>
            </select> 
            </div>
            
            <div>
            <button type="submit">Submit</button>
            </div>
            
        </form>
    </div>)
};


const DefaultHome=()=>{

    const userdata=useContext(UserContext);
    const [componentstyle,setcomponentstyle]=useState({width:"90vw"});

    useEffect(()=>{
        axios.get("http://localhost:8000/getuseremail",{ withCredentials:true}).then((res)=>{
            if(res.data.id){
                userdata.setid(res.data.id);
            }else{
                userdata.setid("1");
            }
            
        });
        
    },[userdata.id]);

    return(<div className="app">
        <Navbar/>
            <div className="content">
            {/* <Dashboard/> */}
            {userdata.id==="1"?<div></div>:<Dashboard/>}
            <div className="component" >
               <Routes>
                    <Route  path="/" element={<Home />}/>
                    <Route path="cart" element={userdata.id==='1'?<NotLoggedinPage/>:<Cart />}/>
                    <Route path="profile" element={userdata.id==="1"?<NotLoggedinPage/>:<Profile/>}/>
                    <Route path="sellbook" element={userdata.id==="1"?<NotLoggedinPage/>:<SellBook/>}/>
                    <Route path="fictional" element={userdata.id==="1"?<NotLoggedinPage/>:<FictionalPage/>}/>
                    <Route path="nonfictional" element={userdata.id==="1"?<NotLoggedinPage/>:<NonFictionalPage/>}/>
                    <Route path="educational" element={userdata.id==="1"?<NotLoggedinPage/>:<Educational/>}/>
                </Routes>
            </div>
    </div></div>);
}

const App=()=>{
    
    
    
    return(
        <div className="app">
            <Routes>
                <Route path="/" element={<MainHome/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/home/*" element={<DefaultHome/>}/>
            </Routes>
            
            </div>
        
        // <div className="home-back">
        //     <Routes>
        //     <Route path="/signup" element={<SignUp/>}/>
        //     <Route path="/" element={<MainHome/>}/>
        //     </Routes>
        // </div>
    )

}

export default App;