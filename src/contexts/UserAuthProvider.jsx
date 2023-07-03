import React from "react";
import { UserAuthContext } from './Contexts';

// Databse imports
import { auth, db} from '../firebase';
import { 
    doc, 
    setDoc, 
    getDoc,
    updateDoc
} from "firebase/firestore";

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile 
} from 'firebase/auth';


import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { chooseRandomColor } from "../helperFunction";



export const UserAuthProvider = (props)=>{
    //TODO - create a user -->SignUp; then make it as a current user via -->SignIn; Create a signout method so that user can signout from the application..
    const [isNotFetched, setIsNotFetched] = useState(false);
    const [submitBtn, setSubmitBtn] = useState(false);
    const [errorFirebase, setErrorFirebase] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState({});
    const [userDbData, setUserDbData] = useState({});


    const [userAvatar, setUserAvatar] = useState({
        userName : '',
        userColor : ''
    });

    const navigate = useNavigate();


    async function userSignUp(name,email, password){
        setSubmitBtn(true);
        await createUserWithEmailAndPassword(auth, email,password).then(async(res)=>{
            setSubmitBtn(false);

            // to update user name 
            const user  = res.user;
            await updateProfile(user,{
                displayName: name,
            });
            // create userDB in firestore under users collection 
            createUserDB(name, email, user.uid, user.metadata.creationTime);
            navigate('/signin');
        })
        .catch((err)=>{
            setErrorFirebase(err.message);
            setTimeout(()=>{
                setErrorFirebase('');
            },2000);
            setSubmitBtn(false);
        });
        return;
    }


    async function userSignIn(email, password){
        //singin code
        setSubmitBtn(true);
        await signInWithEmailAndPassword(auth, email,password).then(async(res)=>{
            setSubmitBtn(false);
            navigate('/');
            setUserData({...user});
            location.reload();
        })
        .catch((err)=>{
            setErrorFirebase(err.message);
            setTimeout(()=>{
                setErrorFirebase('');
            },2000);
            setSubmitBtn(false);
        });
        return;
    }

    function userSignOut(){
        //signout
        signOut(auth).then(()=>{
            setIsAuth(false);
            setUserData({});
            let wishlist = JSON.parse(window.localStorage.getItem('wishlist'));
            let cart = JSON.parse(window.localStorage.getItem('cart'));
            let totalAmt = JSON.parse(window.localStorage.getItem('totalAmt'));
            updateUserShoppingItems(wishlist, 'wishlist');
            updateUserShoppingItems(cart, 'cart');
            window.localStorage.clear();            
            navigate('/');

        }).catch((error)=>{
            console.log(error);
        })
    }
    

    //function to create userDb in firestore
    async function createUserDB(name,email, uid, creationTime){
        //TODO need to done
        const userData = {
            name : name,
            email : email,
            number : '',
            address : "",
            cart : [],
            wishlist: [],
            userCreated: creationTime,
            uid: uid,
            totalAmount:'0'
        }
        await setDoc(doc(db, 'users', uid), userData);
    }


    async function fetchUserData(uid){
        setIsNotFetched(true);
        try{
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            console.log('user db data : ', docSnap.data());
            setUserDbData({...docSnap.data()});
            setIsNotFetched(false);
        }
        catch(err){
            console.log(err);
        }
    }

    async function updateUserProfile(add, num){
        console.log('called');
        const userDocRef = doc(db, 'users', userData.uid);
        try{
            await updateDoc(userDocRef,{
                address : add,
                number: num

            })
        }
        catch(err){
            console.log(err);
        }

    }

    async function updateUserShoppingItems(object, key){
        const userDocRef = doc(db, 'users', userData.uid);
        switch(key){
            case "cart":
                try{
                    await updateDoc(userDocRef,{
                        cart : object
                    })
                }catch(err){
                    console.log(err);
                }
                break;

            case "wishlist":
                try{
                    await updateDoc(userDocRef,{
                        wishlist : object
                    })
                }catch(err){
                    console.log(err);
                }
                break;
            case "totalAmount":
                try{
                    await updateDoc(userDocRef,{
                        totalAmount : object
                    })
                }catch(err){
                    console.log(err);
                }
                break;
        }
    }


    // accessing current user who is authenticated
    useEffect(()=>{
        auth.onAuthStateChanged(async (user)=>{
              JSON.stringify(user);
            if(user){
            setIsAuth(true);
            await fetchUserData(user.uid);
            setUserAvatar((prev)=>({
                userName : user.displayName,
                userColor : chooseRandomColor()
            }));  
            window.localStorage.setItem('cart', JSON.stringify(userDbData.cart === undefined ? [] : userDbData.cart));
            window.localStorage.setItem('wishlist', JSON.stringify(userDbData.wishlist === undefined ? [] : userDbData.wishlist));
            }
        });

    }, []);
    
    useEffect(()=>{
        if(isAuth){
            window.localStorage.setItem('cart', JSON.stringify(userDbData.cart === undefined ? [] : userDbData.cart));
            window.localStorage.setItem('wishlist', JSON.stringify(userDbData.wishlist === undefined ? [] : userDbData.wishlist));
        }
      },[userDbData]);


    return(
        <UserAuthContext.Provider value={{
                    submitBtn, 
                    errorFirebase, 
                    userSignUp, 
                    userSignIn, 
                    userSignOut, 
                    isAuth, 
                    userData, 
                    userAvatar,
                    userDbData,
                    updateUserProfile,
                    updateUserShoppingItems,
                    isNotFetched
                }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}