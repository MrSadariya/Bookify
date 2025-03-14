import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import NotLoggedinPage from "./NotLoggedinPage";
import SkeletonLoader from "./SkeletonLoader";

const Profile=()=>{

    const [profiledata,setprofiledata]=useState(null);
    const [BooksSold,setBooksSold]=useState(0);
    const [AmountEarned,setAmountEarned]=useState(0);
    const [BooksBought,setBooksBought]=useState(0);
    const [displaySold,setdisplaySold]=useState("none");
    const [displayPending,setdisplayPending]=useState("none");
    const [booksold,setbooksold]=useState([]);
    const [bookpending,setbookpending]=useState([]);
    const curr=useContext(CurrentContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        curr.setcurrent("profile");

        const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            toast.error("You are not logged in!!",{duration:3000});
            return;
        }
        const decoded=jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if(currentTime>decoded.exp){
            setisAuthenticated(false);
            localStorage.removeItem("token");
            return;
        }

        const getProfileData=async ()=>{
            try{
                const res=await axios.get(`http://localhost:8000/profile/getprofile`,{
                    headers:{Authorization:`Bearer ${token}`},withCredentials:true
                })
    
                if(res.status===200){
                    setprofiledata(res.data);
                    setBooksSold(res.data.BooksSold);
                    setBooksBought(res.data.BooksBought);
                    setAmountEarned(res.data.MoneyEarned);
                }else{
                    toast.error(res.data.message,{duration:4000});
                    return;
                }

            }catch(err){
                if(err.res){
                    toast.error(err.res.data.message,{duration:3000});
                }
                return;
            }

            try{
                const res1=await axios.get('http://localhost:8000/Books/getbookspending',{
                    headers:{Authorization:`Bearer ${token}`},withCredentials:true
                });
                if(res1.status===200){
                    setbookpending(res1.data);
                }else{
                    toast.error(res1.data.message,{duration:4000});
                    return;
                }

            }catch(err){
                if(err.res1){
                    toast.error(err.res1.data.message,{duration:3000});
                }
                return;
            }
            
            
            try{
                const res2=await axios.get(`http://localhost:8000/Books/getbookssold`,{
                    headers:{Authorization:`Bearer ${token}`},withCredentials:true
                });
                if(res2.status===200){
                    setbooksold(res2.data);
                }else{
                    toast.error(res2.data.message,{duration:4000});
                    return;
                }

            }catch(err){
                if(err.res2){
                    toast.error(err.res2.data.message,{duration:3000});
                }
            }
            
        }
        setLoading(true);
        getProfileData();
        setLoading(false);

    },[curr])

    function handleDropdown(){
        let newval= displaySold==="none"?"block":"none";
        setdisplaySold(newval);
    }

    function handlePending(){
        let newval= displayPending==="none"?"block":"none";
        setdisplayPending(newval);
    }

    if(loading){
        return <SkeletonLoader/>
    }

    if(!isAuthenticated){
        return <NotLoggedinPage/>
    }
     
    return(<div className="profilediv">
        <Toaster position="top-center"/>
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

       <div className="userHistory">

        <div className="booksolddropdown">
            <button onClick={handleDropdown}>Books Sold {displaySold==="none"?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />} </button>
            <div style={{display:`${displaySold}`}} className="booksold-content">
                {booksold.length!==0 && booksold.map((book)=><div>{book._doc.BookName}<span style={{fontSize:"1rem",marginLeft:"1rem"}}>-{book._doc.AuthorName}</span></div>)}
            </div>
        </div>

        <div className="booksolddropdown">
            <button onClick={handlePending}>Books Pending {displayPending==="none"?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />}</button>
            <div style={{display:`${displayPending}`}} className="booksold-content">
                {bookpending.length!==0 &&  bookpending.map((book)=><div >{book.BookName}<span style={{fontSize:"1rem",marginLeft:"1rem"}}>-{book.AuthorName}</span></div>)}  
            </div>
        </div>
       </div>
    </div>);
    
}

export default Profile;