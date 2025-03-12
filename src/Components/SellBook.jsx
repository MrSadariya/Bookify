import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { CurrentContext } from "../Contexts/CurrentContext";

const SellBook=()=>{
    
    const userdata=useContext(UserContext);
    const curr=useContext(CurrentContext);

    useEffect(()=>{
        curr.setcurrent("sellbook");
    },[curr])

    return(<div className="sellbookdiv">
        <form action={`http://localhost:8000/booksell/${userdata.id}`} method="post">
            <div>
            <label>Book Name</label>
            <input type="text" name="BookName" placeholder="Type Book Name" required></input>
            </div>

            <div>
            <label>AuthorName</label>
            <input type="text" name="AuthorName" placeholder="Type Author's Name" required></input> 
            </div>

            <div>
            <label>Price</label>
            <input type="number" name="Price"  placeholder="e.g. $200 "required></input>
            </div>

            <div>
            <label>Years Used</label>
            <input type="number" name="YearsUsed" placeholder="e.g. 2 (in Years)" required></input> 
            </div>

            <div>
            <label>Book Type</label>
            <select name="BookType">
                  <option value="Fictional">Fictional</option>
                  <option value="NonFictional">NonFictional</option>
                  <option value="Educational">Educational</option>
            </select> 
            </div>
            
            <div>
            <button type="submit">Submit</button>
            </div>
            
        </form>
    </div>)
};

export default SellBook;