import React from "react";
import { UserAuthContext } from './Contexts';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from "react";
import { useNavigate } from "react-router";

export const UserAuthProvider = (props)=>{
    //TODO - create a user -->SignUp; then make it as a current user via -->SignIn; Create a signout method so that user can signout from the application..
    const [submitBtn, setSubmitBtn] = useState(false);
    const [errorFirebase, setErrorFirebase] = useState('');

    const navigate = useNavigate();

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
        return true;
    }

    function userSignIn(email, password){
        //singin code
    }

    function userSignOut(){
        //signout
    }

    return(
        <UserAuthContext.Provider value={{submitBtn, errorFirebase, userSignUp, userSignIn, userSignOut}}>
            {props.children}
        </UserAuthContext.Provider>
    )
}