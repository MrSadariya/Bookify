import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { CurrentContext } from "../Contexts/CurrentContext";
import { AlertContext } from "../Contexts/AlertContext";
import axios from "axios";
import Cartbox from "./Cartbox";

const Cart=()=>{
    
    const userdata=useContext(UserContext);
    const [cart,setcart]=useState([]);
    const [items,setitems]=useState(0);
    const [bill,setbill]=useState(0);
    const curr=useContext(CurrentContext);
    const alert=useContext(AlertContext);
    

    function handleCheckout(){
        alert.setshowalert("block");
        alert.setmsg("You Successfully bought the books . Keep Purchasing!!");
        axios.post(`http://localhost:8000/cart/handlecheckout/${userdata.id}`).catch((err)=>console.log(err));
    }

    useEffect(()=>{
        
        curr.setcurrent("cart");
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

export default Cart;