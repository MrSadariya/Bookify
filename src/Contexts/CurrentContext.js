import {React,useState,createContext} from "react";

export const CurrentContext=createContext("home");

export const CurrentContextProvider=(props)=>{

    const [current,setcurrent]=useState("home");

    return(<div>
        <CurrentContext.Provider value={{current,setcurrent}}>
            {props.children}
        </CurrentContext.Provider>
    </div>)
}