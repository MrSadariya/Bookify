const LoginPage=()=>{
    return(<div className="signup-box" >
         <div >
            <form className="signup-main" method="post" action="http://localhost:8000/handlelogin">
                <h1>Login</h1>
                <input type="text" placeholder="Enter Your Email"name="Email"></input>
                <input type="password" placeholder="Enter Your Password" name="Password"></input>
                <button type="submit">Login</button>
                </form>
                <div style={{textAlign:"center" ,marginTop:"1rem",color:"white",fontSize:"1.2rem"}}>Don't have an account ? <a style={{color:"white"}} href={`http://localhost:3000/signup`} >SignUp</a></div>
            </div>

    </div>)
}

export default LoginPage;