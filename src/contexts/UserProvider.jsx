import { useState } from "react";
import { UserContext } from "./Contexts";

export const UserProvider = (props) =>{
    const [likes, setLikes] = useState([]);
    const handleSetLikes = (likedProduct)=>{
        let isPresent = false;
        for(let i=0; i <likes.length; i++){
            if(likes[i].id === likedProduct.id){
                isPresent = true;
                break;
            }
        }

        if(!isPresent){
            console.log('in if');
            setLikes([ ...likes, likedProduct]);
        }else{
            console.log('in else');
            setLikes(likes.filter((ele)=> ele.id !== likedProduct.id));
        }
    }
    return(
        <UserContext.Provider value={{likes,handleSetLikes}}>
            {props.children}
        </UserContext.Provider>
    )
}

