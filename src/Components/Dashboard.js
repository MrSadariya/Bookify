import {React,useContext} from "react";
import './navstyle.css';
import {NavLink} from 'react-router-dom';
import { CurrentContext } from "../Contexts/CurrentContext";

const Dashboard=(props)=>{


  const curr=useContext(CurrentContext);

  const divstyle1= curr.current==="sellbook"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle2= curr.current==="fictional"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle3= curr.current==="nonfictional"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};
  const divstyle4= curr.current==="educational"?{background:"linear-gradient(90deg,#DC98D0 ,#CC1C74 ,#8C0E44 )"}:{};

    return(
        <div>
          <div className="dashboard">
            <div style={divstyle1}><NavLink className="link" to="/home/sellbook">Sell Book</NavLink></div>
            <div style={divstyle2}><NavLink className="link" to="/home/fictional">Fictional</NavLink></div>
            <div style={divstyle3}><NavLink className="link" to="/home/nonfictional">NonFictional</NavLink></div>
            <div style={divstyle4}><NavLink className="link" to="/home/educational">Educational</NavLink></div>
          </div>
        </div>
    );
}

export default Dashboard;