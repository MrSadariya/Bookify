import React from "react";
import './SearchedBookBox.css';

const SearchedBookBox=(props)=>{
    return(
        <div key={props.id} className="searchedBookBox">
            <div className="searchedBookPhotoDiv"><img src={props.imageURL} alt={props.title}></img></div>
            <div className="searchedBookDetail">
                <div className="searchedHeading">{props.title}</div>
                <div className="searchedAuthor">{props.author}</div>
                <div className="searchedDescription">Published by {props.publisher} on {props.date}</div>
                <a className="previewAnchor" rel="noreferrer" target="_blank" href={props.previewLink}><button>Preview</button></a>

            </div>
        </div>
    )

}


export default SearchedBookBox;