import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Profile=()=>{
    
    const userdata=useContext(UserContext);
    const [profiledata,setprofiledata]=useState(null);
    const [BooksSold,setBooksSold]=useState(0);
    const [AmountEarned,setAmountEarned]=useState(0);
    const [BooksBought,setBooksBought]=useState(0);
    const [displaySold,setdisplaySold]=useState("none");
    const [displayPending,setdisplayPending]=useState("none");
    const [booksold,setbooksold]=useState([]);
    const [bookpending,setbookpending]=useState([]);
    const curr=useContext(CurrentContext);

    useEffect(()=>{
        curr.setcurrent("profile");
        axios.get(`http://localhost:8000/getprofile/${userdata.id}`)
        .then((res)=>{
            if(!res.data.error){
                setprofiledata(res.data);
                setBooksSold(res.data.BooksSold);
                setBooksBought(res.data.BooksBought);
                setAmountEarned(res.data.MoneyEarned);
            }
        });
        axios.get(`http://localhost:8000/bookpending/${userdata.id}`)
        .then((res)=>{
            setbookpending(res.data);
        });

        axios.get(`http://localhost:8000/booksold/${userdata.id}`)
        .then((res)=>{
            console.log(res.data);
            setbooksold(res.data);
        })

    },[curr, userdata.id])

    function handleDropdown(){
        let newval= displaySold==="none"?"block":"none";
        setdisplaySold(newval);
    }

    function handlePending(){
        let newval= displayPending==="none"?"block":"none";
        setdisplayPending(newval);

    }
     
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

       <div className="userHistory">

        <div className="booksolddropdown">
            <button onClick={handleDropdown}>Books Sold {displaySold==="none"?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />} </button>
            <div style={{display:`${displaySold}`}} className="booksold-content">
                {booksold.map((book)=><div>{book._doc.BookName}<span style={{fontSize:"1rem",marginLeft:"1rem"}}>-{book._doc.AuthorName}</span></div>)}
                
            </div>
        </div>

        <div className="booksolddropdown">
            <button onClick={handlePending}>Books Pending {displayPending==="none"?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />}</button>
            <div style={{display:`${displayPending}`}} className="booksold-content">
                 {bookpending.map((book)=><div >{book.BookName}<span style={{fontSize:"1rem",marginLeft:"1rem"}}>-{book.AuthorName}</span></div>)}  
            </div>
        </div>
       </div>
    </div>);
    
}

export default Profile;