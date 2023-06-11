import { useEffect, useState } from "react";
import { UserContext } from "./Contexts";

export const UserProvider = (props) =>{
    // accessing from localStorage
    const savedLiked = JSON.parse(window.localStorage.getItem('likes'));
    const savedCart = JSON.parse(window.localStorage.getItem('cart'));

    // checking if localStorage have those than use them else go with empty array
    const [likes, setLikes] = useState(savedLiked || []);
    const [cart, setCart] = useState(savedCart || []);


    // Methods to Handle Liked Product
    const handleSetLikes = (likedProduct)=>{
        let isPresent = false;
        for(let i=0; i < likes.length; i++){
            if(likes[i].id === likedProduct.id){
                isPresent = true;
                break;
            }
        }
        if(!isPresent) setLikes([ ...likes, likedProduct]);
        else return;

        return isPresent;
    }
    const removeLikedProducts = (id)=>{
        const newLikedArr = likes.filter((product) => product.id !== id);
        setLikes( newLikedArr);
    }

    // Methods to Handle Cart items

    const handleCartItem = (cartProduct) =>{
        let isPres = false;
        for(let i=0; i<cart.length; i++){
            if(cart[i].id === cartProduct.id){
                isPres = true;
                break;
            } 
        }
        if(!isPres) setCart([...cart, cartProduct]);
        else return;
    }
    const removeCartItem = (id) => {
        const newCartArr = likes.filter((product) => product.id !== id);
        setCart( newCartArr );
    }

    useEffect(()=>{
        window.localStorage.setItem('likes',JSON.stringify(likes));
        
    }, [likes]);

    useEffect(()=>{
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return(
        <UserContext.Provider value={{likes,handleSetLikes, removeLikedProducts, cart, handleCartItem, removeCartItem}}>
            {props.children}
        </UserContext.Provider>
    )
}

