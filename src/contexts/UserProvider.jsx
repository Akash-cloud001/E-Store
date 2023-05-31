import { useEffect, useState } from "react";
import { UserContext } from "./Contexts";

export const UserProvider = (props) =>{
    const savedLiked = JSON.parse(window.localStorage.getItem('likes'));
    const [likes, setLikes] = useState(savedLiked || []);

    useEffect(()=>{
        window.localStorage.setItem('likes',JSON.stringify(likes));
    }, [likes])


    const handleSetLikes = (likedProduct)=>{
        let isPresent = false;
        for(let i=0; i < likes.length; i++){
            if(likes[i].id === likedProduct.id){
                isPresent = true;
                break;
            }
        }
        if(!isPresent){
            setLikes([ ...likes, likedProduct]);
        }else{
            // setLikes(likes.filter((ele)=> ele.id !== likedProduct.id));
            return;
        }
        return isPresent;
    }
    return(
        <UserContext.Provider value={{likes,handleSetLikes}}>
            {props.children}
        </UserContext.Provider>
    )
}

