import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import Footer from "./Footer"


const MainHome=()=>{
    return(<div className="homepage-main">
        
        <div className="start">
            <div className="intro">
                <div className="heading"><h1>Sell Books & Magazine Online</h1></div>
                <div className="description">Bookify is a indian online website for books, and magazines. We facilitate the sale of books, and magazines by connecting sellers with buyers all around the India. What are you waiting for? Sign up today and take the first steps to selling on Bookify!
           </div>
           <div style={{width:"10vw",height:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"brown",color:"white",borderRadius:"1rem",textDecoration:"none"}}><NavLink className="link" to="/signup">Sign Up</NavLink></div>
            </div>

            <div className="logo" style={{fontSize:"2.5rem",color:"black",fontWeight:"bolder",display:"flex",flexDirection:'column',alignItems:"center"}}>
            <FontAwesomeIcon icon={faBookOpen} size={"2x"} style={{color: "black",}}  />
                <h1 style={{color:"black"}}>Bookify</h1>
            </div>

            
            <div className="types types-img">
                
            </div>
            
        </div>

        <div className="detail-home">
            <div className="text-contain">
            <div className="type-text">Welcome to our book exchange platform, where book lovers unite to buy and sell their beloved stories! Whether you're looking to declutter your shelves or find a new adventure, you're in the right place. Sell your gently loved books to someone who will cherish them just as much as you did, or browse our diverse selection to discover your next literary obsession. Join our community today and let the stories continue to inspire and connect us all.</div>
            <div style={{display:"flex",flexDirection:"row",height:"2rem",width:"100%",alignItems:"center",justifyContent:"space-evenly"}}> <div style={{width:"6vw",height:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"black",color:"black",borderRadius:"0.5rem",textDecoration:"none",display:"inline",marginLeft:"0.5rem",marginRight:"0.5rem"}}><NavLink style={{color:"white"}} className="link" to="/login">Login</NavLink></div>   <div style={{width:"8vw",height:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"black",color:"white",borderRadius:"0.5rem",textDecoration:"none",display:"inline",paddingLeft:"1rem",marginLeft:"0.5rem"}}><NavLink style={{color:"white"}}className="link" to="/signup">Sign Up</NavLink></div>
            </div>
            </div>
        <div className="types" style={{color:"black"}}>
                <div className="row">
                    <div className="fiction real-fiction" style={{color:"white"}}><NavLink className="link" to="/home/fictional">Fiction</NavLink>  </div>
                    <div className="non-fiction real-nonfiction" style={{color:"white"}}><NavLink className="link" to="/home/nonfictional">NonFictional</NavLink> </div>
                </div>

                <div className="row">
                    <div className="educational real-educational" style={{color:"white"}}><NavLink className="link" to="/home/educational">Educational</NavLink> </div>
                    <div className="magazine real-magazine" style={{color:"white"}}><NavLink className="link" to="/home">Books</NavLink> </div>
                </div>
            </div>

        </div>

        <Footer/>

    </div>)
}

export default MainHome;