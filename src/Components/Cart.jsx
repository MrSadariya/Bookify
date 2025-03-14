import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Cartbox from "./Cartbox";
import {jwtDecode} from "jwt-decode";
import { Toaster,toast } from 'react-hot-toast';
import NotLoggedinPage from './NotLoggedinPage';
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";


const Cart=()=>{
    
    const [cart,setcart]=useState([]);
    const [items,setitems]=useState(0);
    const [bill,setbill]=useState(0);
    const curr=useContext(CurrentContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    

    const handleCheckout =async ()=>{
        try{
            const token=localStorage.getItem("token");
            const resposne=await axios.post(`http://localhost:8000/cart/handlecheckout`,{},{
                headers:{Authorization:`Bearer ${token}`},withCredentials:true
            });

            if(resposne.status===200){
                setcart([]);
                setitems(0);
                setbill(0);
                toast.success("You Succesfully purchased books!!",{duration:5000});
            }
            
        }catch(err){
            if(err.resposne){
                if(err.resposne.status===401){
                    toast.error("Unauthorised Access , Login please!!",{duration:5000});
                    navigate("/login");
                }else{
                    toast.error(err.resposne.data.message,{duration:3000});
                }

            }
        }
        

        
    }

    useEffect(()=>{

        curr.setcurrent("cart");

        const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            return;
        }
        const decoded=jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if(currentTime>decoded.exp){
            setisAuthenticated(false);
            localStorage.removeItem("token");
            return;
        }

        const fetchItems=async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/cart/getitems`,{
                    headers:{Authorization:`Bearer ${token}`},withCredentials:true
                });
                
                if (res.status === 200) { 
                
                    setcart(res.data);
                    setitems(res.data.reduce((a, book) => {
                        return a + (book.count ? Number(book.count) : 1);
                    }, 0));
                    setbill(res.data.reduce((a, book) => {
                        return a + Number(book._doc.Price);
                    }, 0));
                
                } else {
                    toast.error(res.data.message,{duration:5000})
                }
            } catch (error) {
                toast.error("Some Error has occured!!, Try Again.",{duration:5000})  
            }

        }
        setLoading(true);
        fetchItems();
        setLoading(false);

    },[curr])

    if(loading){
        return <SkeletonLoader/>
    }

    if(!isAuthenticated){
        return <NotLoggedinPage/>;
    }

    return(
          <div style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
        <Toaster position="top-center"/>
        
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
    </div>
    );
}

export default Cart;