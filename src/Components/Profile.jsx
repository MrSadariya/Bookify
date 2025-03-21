import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp,faUserPen } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import NotLoggedinPage from "./NotLoggedinPage";
import SkeletonLoader from "./SkeletonLoader";
import { SidebarContext } from "../Contexts/SidebarContext";
import './Profile.css';
import defaultUserPic from "../Static/DefaultUserPic.png";
import './ProfilePicModal.css';
import { useNavigate } from "react-router-dom";

const ProfilePicModal = ({ isOpen, onClose, onSubmit,setExternalUrl  }) => {
    const [profileUrl, setProfileUrl] = useState('');
  
    useEffect(() => {
      const handleEscKey = (event) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      };
  
      window.addEventListener('keydown', handleEscKey);
   
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      return () => {
        window.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'auto';
      };
    }, [isOpen, onClose]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(profileUrl);
      setProfileUrl('');
      onClose();
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setProfileUrl(value);
        if (setExternalUrl) {
          setExternalUrl(value);
        }
      };
  
    if (!isOpen) return null;
  
    return (
      <div className="profile-modal-overlay">
        <div className="profile-modal-content">
          <button className="profile-modal-close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="profile-modal-title">Update Profile Picture</h2>
          <form className="profile-modal-form" onSubmit={handleSubmit}>
            <div className="profile-modal-form-group">
              <label className="profile-modal-label" htmlFor="profile-url">Profile Picture URL</label>
              <input
                id="profile-url"
                className="profile-modal-input"
                type="text"
                value={profileUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>
            <button type="submit" className="profile-modal-submit-button">
              Update Profile Picture
            </button>
          </form>
        </div>
      </div>
    );
  };

const Profile=()=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;

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
    const [loading,setLoading]=useState(false);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const navigate=useNavigate();

    useEffect(()=>{

        

        curr.setcurrent("profile");
        setIsSideBar(false);

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

        const getProfileData=async ()=>{
            try{
                const res=await axios.get(`${BASE_URL}/profile/getprofile`,{
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
                const res1=await axios.get(`${BASE_URL}/Books/getbookspending`,{
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
                const res2=await axios.get(`${BASE_URL}/Books/getbookssold`,{
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

    },[curr, setIsSideBar])

    function handleDropdown(){
        let newval= displaySold==="none"?"block":"none";
        setdisplaySold(newval);
    }

    function handlePending(){
        let newval= displayPending==="none"?"block":"none";
        setdisplayPending(newval);
    }

    const handleProfilePicSubmit=async()=>{
        console.log(currentUrl);
        
        try{
            const token=localStorage.getItem("token");
            if(!token){
                setisAuthenticated(false);
                return;
            }
            const response=await axios.post(`${BASE_URL}/profile/addProfilePic`,{profilePicURL:currentUrl},{
                headers:{Authorization:`Bearer ${token}`},withCredentials:true
            })

            if(response.status===200){
                toast.success(response.data.message,{duration:3000});
                navigate(0);
            }

        }catch(err){

            if(err.response){
                toast.error(err.response.data.message,{duration:3000});
            }

        }

    }

    if(loading){
        return <SkeletonLoader/>
    }

    if(!isAuthenticated){
        return <NotLoggedinPage/>
    }
     
    return(
    <div className="profilediv-main">
        <Toaster position="top-center"/>
       
        <ProfilePicModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleProfilePicSubmit}
            setExternalUrl={setCurrentUrl}
        />

       <div className="profile-main">
        <div className="profile-photo">
            <img src={profiledata?.profilePicURL || defaultUserPic}  alt="User-Pic"></img>
            <FontAwesomeIcon onClick={() => setIsModalOpen(true)} className="profile-photo-editBtn" icon={faUserPen} />
            
        </div>
        <div className="user-detail">
            {profiledata===null?<span></span>:<h1 className="user-detail-name">{profiledata.FullName}</h1>}
            {profiledata===null?<span></span>:<p className="user-detail-mail">{profiledata.Email}</p>}

            <div className="user-bookcount">
                <div className="bookcount-div"> <div className="user-bookcount-heading" >Books Sold</div> <div >{BooksSold}</div> </div>
                <div className="bookcount-div"> <div className="user-bookcount-heading">Amount Earned</div> <div >$ {AmountEarned}</div></div>
                <div className="bookcount-div"> <div className="user-bookcount-heading">Books Bought</div> <div>{BooksBought}</div></div>
            </div>
        </div>
       </div>

       <div className="userHistory">

        <div className="booksolddropdown">
            <button className="userHistory-btn" onClick={handleDropdown}>Books Sold {displaySold==="none"?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />} </button>
            <div style={{display:`${displaySold}`}} className="booksold-content">
                {booksold.length!==0 && booksold.map((book)=><div>{book._doc.BookName}<span>-{book._doc.AuthorName}</span></div>)}
            </div>
        </div>

        <div className="booksolddropdown lastDiv">
            <button className="userHistory-btn " onClick={handlePending}>Books Pending {displayPending==="none"?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />}</button>
            <div style={{display:`${displayPending}`}} className="booksold-content">
                {bookpending.length!==0 &&  bookpending.map((book)=><div >{book.BookName}<span >-{book.AuthorName}</span></div>)}  
            </div>
        </div>
       </div>
    </div>);
    
}

export default Profile;