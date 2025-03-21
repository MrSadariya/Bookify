import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import Cartbox from "./Cartbox";
import {jwtDecode} from "jwt-decode";
import { Toaster,toast } from 'react-hot-toast';
import NotLoggedinPage from './NotLoggedinPage';
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";
import { SidebarContext } from "../Contexts/SidebarContext";
import "./Cart.css";


const Cart=()=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;
    
    const [cart,setcart]=useState([]);
    const [items,setitems]=useState(0);
    const [bill,setbill]=useState(0);
    const curr=useContext(CurrentContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);
    

    const handleCheckout =async ()=>{
        try{
            const token=localStorage.getItem("token");
            const resposne=await axios.post(`${BASE_URL}/cart/handlecheckout`,{},{
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
        setIsSideBar(false);
    },[setIsSideBar])

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
                const res = await axios.get(`${BASE_URL}/cart/getitems`,{
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
        <div className="cart-main-container">
           <Toaster position="top-center"/>
        
            <div className="cart-books-container">
                <div className="cart-books-container-heading">Your Orders</div>
                <div className="cart-book-contain">
                {cart.map((book)=><Cartbox bookid={book._doc._id} key={book._doc._id} BookName={book._doc.BookName} AuthorName={book._doc.AuthorName} Price={book._doc.Price} YearsUsed={book._doc.YearsUsed} count={book.count} {...(book._doc.bookCoverURL && { bookCoverURL: book._doc.bookCoverURL })}/>)}
                </div>
            </div>

            <div className="cart-summary-div" >
                <div className="cart-summary-heading" ><h2>Cart Summary</h2></div>
                
                <div ><div className="cart-summary-key">Total Items</div> <div className="cart-summary-value">{items}</div> </div>
                <div ><div className="cart-summary-key">GST Tax</div>  <div className="cart-summary-value">0</div> </div>
                <div ><div className="cart-summary-key">Discount</div>  <div className="cart-summary-value"> 0</div> </div>
                <br></br>
                <div > <div className="cart-summary-key">Total Bill</div>  <div className="cart-summary-value">${bill}</div> </div>
                <div className="cart-summary-coupen" > <input type="text" placeholder="Coupen Code"></input> </div>
                <div className="cart-summary-apply" ><button >Apply</button></div>
                <div className="cart-summary-checkout" ><button onClick={handleCheckout}>CheckOut</button></div>
                
                

            </div>
    </div>
    );
}

export default Cart;