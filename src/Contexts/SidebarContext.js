import {React,useState,createContext} from "react";

export const SidebarContext=createContext(null);

export const SidebarProvider=(props)=>{

    const [isSideBar,setIsSideBar]=useState(false);

    return(<div>
        <SidebarContext.Provider value={{isSideBar,setIsSideBar}}>
            {props.children}
        </SidebarContext.Provider>
    </div>)
}