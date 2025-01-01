import React, { useContext, useEffect, useState } from "react";
import './Explore.css';
import { CurrentContext } from "../Contexts/CurrentContext";
import { useSearchParams } from "react-router-dom";
import animationURL from '../Static/Animation - 1735653208069.gif'
import { getRoles } from "@testing-library/react";
import axios from "axios";
import SearchedBookBox from "./SearchedBookBox";
import defaulImgURL from '../Static/productnotfound.png';

const Explore=()=>{

    const curr=useContext(CurrentContext);

    const [isSearching,setisSearching]=useState(0);

    const [genre,setgenre]=useState("");
    const [price,setprice]=useState("");
    const [resBooks,setresBooks]=useState([]);

    const BASEURL="https://www.googleapis.com/books/v1/volumes";
    const APIKEY=process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

    const divstyle1= genre==="Educational"?{boxShadow:"0px 0px 10px 3.5px white"}:{};
    const divstyle2= genre==="Fictional"?{boxShadow:"0px 0px 10px 3.5px white"}:{};
    const divstyle3= genre==="Non-Fictional"?{boxShadow:"0px 0px 10px 3.5px white"}:{};

    const handlePriceChange = (event) => {
        setprice(event.target.value);
      };

    const handleSearch=async ()=>{
        if(!price){
            return;
        }
        setisSearching(-1);
        const newInput = price.split(" ").join("+");
        const res=await axios.get(`${BASEURL}?q=${newInput}&key=${APIKEY}`);
        setresBooks(res.data.items);
        setisSearching(1);
    }
  
    useEffect(()=>{
            curr.setcurrent("explore");
    },[])

    return(
        <div className="eContainer">
            <h2 style={{marginTop:"1rem",fontWeight:"800"}}>Book Genie</h2>
            <h4 style={{marginTop:"1rem"}}>Choose Options , and Get Book Suggestions</h4>

            {/* <h2 style={{alignSelf:"flex-start",marginLeft:"8rem",marginTop:"5rem"}}>Book Type</h2>
            <div className="eTypeContainer">
                <button style={divstyle1} className="typeboxbtn" onClick={()=>{setgenre("Educational")}}>
                    <div className="typeHeading">Educational</div>
                    <div className="typeDescription">Unlock the door to knowledge and mastery with books that enlighten and empower.</div>
                </button>
                
                <button style={divstyle2} className="typeboxbtn" onClick={()=>{setgenre("Fictional")}}>
                    <div className="typeHeading">Fictional</div>
                    <div className="typeDescription">Dive into worlds of imagination where every page is a new adventure.</div>
                </button>

                <button style={divstyle3} className="typeboxbtn" onClick={()=>{setgenre("Non-Fictional")}}>
                    <div className="typeHeading">Non-Fictional</div>
                    <div className="typeDescription">Discover the beauty of truth and the power of real stories that inspire.</div>
                </button>
                
            </div> */}

            <div className="priceInputContainer">
                <h2>Search For Book</h2>
                <input style={{marginTop:"2rem"}} type="text" placeholder="ex . Harry Potter$" value={price} onChange={handlePriceChange}></input>
            </div>

            {isSearching===0 && <button className="searchBtn" onClick={handleSearch}>Search Books</button> }
            {isSearching===-1 && <button style={{backgroundColor:"white"}} className="searchBtn" ><img style={{width:"auto",height:"100%",objectFit:"cover"}} src={animationURL} alt='loading...'></img></button>}
            {isSearching===1 && <button disabled={true} className="searchBtn" onClick={handleSearch}>Searched</button> }
            
            <div className="searchedBookContainer">
            {isSearching === 1 && resBooks && resBooks.map((book, index) => (
            <SearchedBookBox title={book.volumeInfo.title} imageURL={book.volumeInfo.imageLinks?.thumbnail || defaulImgURL} key={book.id} id={book.id} author={book.volumeInfo.authors[0]} publisher={book.volumeInfo.publisher || "--"} date={book.volumeInfo.publishedDate || "--"} previewLink={book.volumeInfo.previewLink}/>
            ))}
            </div>


        </div>
        
    )
}


export default Explore;