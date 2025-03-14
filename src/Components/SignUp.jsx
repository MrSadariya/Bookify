import axios from "axios";
import { useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import { useNavigate  } from "react-router-dom";

const SignUp=()=>{
    const navigate=useNavigate ();
    const [formData, setFormData] = useState({ FullName: "", Email: "", Password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{

            const response=await axios.post(`http://localhost:8000/auth/signup`,formData,{
                headers:{ "Content-Type": "application/json"},  
            })
    
            if(response.status===200){
                navigate("/login");
            }

        }catch(err){
            console.log("Error:",err);
            if(err.response){
                toast.error(err.response.data.message,{duration:3000});
            }
        }
        
    }


    return (
        <div className="signup-box">
            <Toaster position="top-center"/>
            <div >
            <form className="signup-main" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <input type="text" placeholder="Your Full Name" name="FullName" onChange={handleChange}></input>
                <input type="text" placeholder="Enter Your Email" name="Email" onChange={handleChange}></input>
                <input type="password" placeholder="Enter Your Password" name="Password" onChange={handleChange}></input>
                <button type="submit">Add Account</button>
                </form>
                <div style={{textAlign:"center" ,marginTop:"1rem",color:"white",fontSize:"1.2rem"}}>Already have an account ? <a style={{color:"white"}} href={`http://localhost:3000/login`}>Login</a></div>
            </div>
        </div>
    );
}

export default SignUp;