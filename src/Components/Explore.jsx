import React, { useContext, useEffect, useState } from "react";
import './Explore.css';
import { CurrentContext } from "../Contexts/CurrentContext";
import animationURL from '../Static/Animation - 1735653208069.gif'
import axios from "axios";
import SearchedBookBox from "./SearchedBookBox";
import defaulImgURL from '../Static/productnotfound.png';
import toast, { Toaster } from "react-hot-toast";
import { SidebarContext } from "../Contexts/SidebarContext";
import NotLoggedinPage from "./NotLoggedinPage";

const Explore=()=>{

    const curr=useContext(CurrentContext);
    const [isAuthenticated,setisAuthenticated]=useState(true);
    const {isSideBar,setIsSideBar}=useContext(SidebarContext);

    const [isSearching,setisSearching]=useState(0);

    const [price,setprice]=useState("");
    const [resBooks,setresBooks]=useState([]);

    const BASEURL="https://www.googleapis.com/books/v1/volumes";
    const APIKEY=process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

    const handlePriceChange = (event) => {
        setprice(event.target.value);
      };

    const handleSearch=async ()=>{
        if(!price){
            toast.error("Book name is empty!!",{duration:2000});
            return;
        }
        setisSearching(-1);
        const newInput = price.split(" ").join("+");
        const res=await axios.get(`${BASEURL}?q=${newInput}&key=${APIKEY}`);
        setresBooks(res.data.items);
        setisSearching(0);
        setprice("");
    }

    useEffect(()=>{
        curr.setcurrent("explore");
        setIsSideBar(false);
        const token=localStorage.getItem("token");
        if(!token){
            setisAuthenticated(false);
            return;
        }
    },[curr, setIsSideBar])

    if(!isAuthenticated){
        return <NotLoggedinPage/>;
    }

    return(
        <div className="eContainer">
            <Toaster position="top-center"/>
            <div className="explore-mainheading" style={{marginTop:"1rem",fontWeight:"800"}}>Book Genie</div>
            <div className="explore-subheading" style={{marginTop:"1rem"}}>Choose Options , and Get Book Suggestions</div>

            <div className="priceInputContainer">
                <h2>Search For Book</h2>
                <input style={{marginTop:"2rem"}} type="text" placeholder="ex . Harry Potter$" value={price} onChange={handlePriceChange}></input>
            </div>

            {isSearching===0 && <button className="searchBtn" onClick={handleSearch}>Search Books</button> }
            {isSearching===-1 && <button style={{backgroundColor:"white"}} className="searchBtn" ><img style={{width:"auto",height:"100%",objectFit:"cover"}} src={animationURL} alt='loading...'></img></button>}
            {isSearching===1 && <button disabled={true} className="searchBtn" onClick={handleSearch}>Searched</button> }
            
            <div className="searchedBookContainer">
            {resBooks.length!==0 && resBooks.map((book, index) => (
            <SearchedBookBox title={book.volumeInfo.title} imageURL={book.volumeInfo.imageLinks?.thumbnail || defaulImgURL} key={book.id} id={book.id} author={book.volumeInfo.authors?.[0]||"--"} publisher={book.volumeInfo.publisher || "--"} date={book.volumeInfo.publishedDate || "--"} previewLink={book.volumeInfo.previewLink}/>
            ))}
            </div>
            
            


        </div>
        
    )
}


export default Explore;