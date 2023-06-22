import React from "react";
import { UserAuthContext } from './Contexts';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,updateProfile } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const UserAuthProvider = (props)=>{
    //TODO - create a user -->SignUp; then make it as a current user via -->SignIn; Create a signout method so that user can signout from the application..
    const [submitBtn, setSubmitBtn] = useState(false);
    const [errorFirebase, setErrorFirebase] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    console.log(userData.uid)
    function userSignUp(name,email, password){
        setSubmitBtn(true);
        createUserWithEmailAndPassword(auth, email,password).then(async(res)=>{
            console.log(res);
            setSubmitBtn(false);

            // to update user name 
            const user  = res.user;
            await updateProfile(user,{
                displayName: name,
            });
            navigate('/signin');
        })
        .catch((err)=>{
            console.log(err);
            setErrorFirebase(err.message);
            setTimeout(()=>{
                setErrorFirebase('');
            },2000);
            setSubmitBtn(false);
        });
        return;
    }

    function userSignIn(email, password){
        //singin code
        setSubmitBtn(true);
        signInWithEmailAndPassword(auth, email,password).then(async(res)=>{
            console.log(res);
            setSubmitBtn(false);            
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
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
            alert('Success');
        }).catch((error)=>{
            console.log(error);
        })
    }

    // accessing current user who is authenticated
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          console.log(user);
          JSON.stringify(user);
          if(user){
            setUserData({...user});
            setIsAuth(true);
          }
        });
      }, []);


    return(
        <UserAuthContext.Provider value={{submitBtn, errorFirebase, userSignUp, userSignIn, userSignOut, isAuth, userData}}>
            {props.children}
        </UserAuthContext.Provider>
    )
}