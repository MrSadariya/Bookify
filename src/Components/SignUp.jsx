const SignUp=()=>{
    return (
        <div className="signup-box">
            <div >
            <form className="signup-main" method="post" action="http://localhost:8000/handlenewuser">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Your Full Name" name="FullName"></input>
                <input type="text" placeholder="Enter Your Email" name="Email"></input>
                <input type="password" placeholder="Enter Your Password" name="Password"></input>
                <button type="submit">Add Account</button>
                </form>
                <div style={{textAlign:"center" ,marginTop:"1rem",color:"white",fontSize:"1.2rem"}}>Already have an account ? <a style={{color:"white"}} href={`http://localhost:3000/login`}>Login</a></div>
            </div>
        </div>
    );
}

export default SignUp;