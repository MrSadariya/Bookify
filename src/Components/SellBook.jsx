import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../Contexts/CurrentContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NotLoggedinPage from "./NotLoggedinPage";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../Contexts/SidebarContext";
import "./SellBook.css";

const SellBook=()=>{

    const BASE_URL=process.env.REACT_APP_BASE_URL;

    const navigate=useNavigate();
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);
    
    const curr=useContext(CurrentContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);
    const [formData, setFormData] = useState({
        BookName: "",
        AuthorName: "",
        Price: "",
        YearsUsed: "",
        bookCoverURL:"",
        BookType: "Fictional",
        BookDescription: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(()=>{
        curr.setcurrent("sellbook");
        setIsSideBar(false);
        const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            return;
        }
    },[curr, setIsSideBar])

    const handleSellBook=async (e)=>{
        e.preventDefault();

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
        
        try{

            const res=await axios.post(`${BASE_URL}/Books/addbook`,formData,{
                headers:{Authorization:`Bearer ${token}`},withCredentials:true
            })
    
            if(res.status===200){
                toast.success("Book put on sold!!",{duration:4000});
                setFormData({
                    BookName: "",
                    AuthorName: "",
                    Price: "",
                    YearsUsed: "",
                    bookCoverURL:"",
                    BookType: "Fictional",
                    BookDescription: "",
                })
            }else{
                toast.error(res.data.message,{duration:3000});
            }

        }catch(err){
            if(err.response){
                toast.error(err.response.data.message,{duration:3000});
            }
        }
        

    }

    if(!isAuthenticated){
        return <NotLoggedinPage/>
    }

    return(<div className="sellbookdiv">
        <Toaster position="top-center"/>
        <form onSubmit={handleSellBook}>
            <div>
            <label>Book Name</label>
            <input type="text" name="BookName" placeholder="Type Book Name" value={formData.BookName} onChange={handleChange} required></input>
            </div>

            <div>
            <label>AuthorName</label>
            <input type="text" name="AuthorName" placeholder="Type Author's Name" value={formData.AuthorName} onChange={handleChange} required></input> 
            </div>

            <div>
            <label>Price</label>
            <input type="number" name="Price"  placeholder="e.g. $200 " value={formData.Price} onChange={handleChange} required></input>
            </div>

            <div>
            <label>Years Used</label>
            <input type="number" name="YearsUsed" placeholder="e.g. 2 (in Years)" value={formData.YearsUsed} onChange={handleChange}  required></input> 
            </div>

            <div>
            <label>CoverImage URL(Link)</label>
            <input type="text" name="bookCoverURL"  placeholder="e.g. CoverImage_URL "value={formData.bookCoverURL} onChange={handleChange}  required></input>
            </div>

            <div>
            <label>Book Type</label>
            <select name="BookType" value={formData.BookType} onChange={handleChange}>
                  <option value="Fictional">Fictional</option>
                  <option value="NonFictional">NonFictional</option>
                  <option value="Educational">Educational</option>
            </select> 
            </div>

            <div>
                <label>Book Description</label>
                <textarea
                    name="BookDescription"
                    placeholder="Enter a brief description of the book"
                    value={formData.BookDescription}
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div>
            <button type="submit">Submit</button>
            </div>
            
        </form>
    </div>)
};

export default SellBook;