import React,{useState,createContext} from "react";

export const UserContext=createContext("1");

export const UserContextProvider=(props)=>{

    const [id,setid]=useState("1");

    return(<div>
        <UserContext.Provider value={{id,setid}}>
          {props.children}
        </UserContext.Provider>
    </div>);
    
}