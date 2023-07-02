import { useContext, useEffect, useState } from "react";
import { UserAuthContext, UserContext } from "./Contexts";

export const UserProvider = (props) =>{


    const { userDbData } = useContext(UserAuthContext);

    // accessing from localStorage
    const savedLiked = JSON.parse(window.localStorage.getItem('wishlist'));
    const savedCart = JSON.parse(window.localStorage.getItem('cart'));
    // const savedTotalAmt = Number(JSON.parse(window.localStorage.getItem('totalAmt')));
    // checking if localStorage have those than use them else go with empty array
    const [likes, setLikes] = useState(savedLiked || []);
    const [cart, setCart] = useState(savedCart || []);
    const [totalAmt, setTotalAmt] = useState(0);
    
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
        if(!isPres){
            setCart([...cart, cartProduct]);
            setTotalAmt((Number(totalAmt) + Number(cartProduct.finalPrice)).toFixed(3));
        }
        else return;
    }
    const removeCartItem = (id,finalPrice) => {
        const newCartArr = cart.filter((product) => product.id !== id);

        console.log('removeCartItem:: ' ,newCartArr,finalPrice);
        setCart( newCartArr );
        setTotalAmt((Number(totalAmt) - Number(finalPrice)).toFixed(3));
    }

    
    // To Update Likes
    useEffect(()=>{
        window.localStorage.setItem('wishlist',JSON.stringify(likes));
    }, [likes]);

    // To update Cart and totalAmount
    useEffect(()=>{
        window.localStorage.setItem('cart', JSON.stringify(cart));
        window.localStorage.setItem('totalAmt', JSON.stringify(totalAmt));
    }, [cart]);


    return(
        <UserContext.Provider value={{
                likes,
                handleSetLikes, 
                removeLikedProducts, 
                cart, 
                handleCartItem, 
                removeCartItem, 
                totalAmt
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

