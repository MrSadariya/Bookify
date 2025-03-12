import React from "react";
import {Routes,Route} from 'react-router-dom';
import './Components/navstyle.css';
import 'font-awesome/css/font-awesome.min.css';
import MainHome from "./Components/MainHome";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import DefaultHome from "./Components/DefaultHome";

const App=()=>{
    
    return(
        <div className="app">
            <Routes>
                <Route path="/" element={<MainHome/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                
                <Route path="/home/*" element={<DefaultHome/>}/>
            </Routes>    
        </div>

    )

}

export default App;