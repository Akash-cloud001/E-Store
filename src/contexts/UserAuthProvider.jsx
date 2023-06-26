import React from "react";
import { UserAuthContext } from './Contexts';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { chooseRandomColor } from "../helperFunction";

export const UserAuthProvider = (props)=>{
    //TODO - create a user -->SignUp; then make it as a current user via -->SignIn; Create a signout method so that user can signout from the application..
    const [submitBtn, setSubmitBtn] = useState(false);
    const [errorFirebase, setErrorFirebase] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState({});

    const [userAvatarColor, setUserAvatarColor] = useState('');

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
            navigate('/');
        }).catch((error)=>{
            console.log(error);
        })
    }
    //

    function updateUserInfo(uid, name, email, phoneNumber){
        //TODO need to done
    }

    // accessing current user who is authenticated
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          JSON.stringify(user);
          if(user){
            setUserData({...user});
            setIsAuth(true);
          }
        });
      }, []);
      useEffect(()=>{
        setUserAvatarColor(chooseRandomColor());
      },[])

    return(
        <UserAuthContext.Provider value={{
                    submitBtn, 
                    errorFirebase, 
                    userSignUp, 
                    userSignIn, 
                    userSignOut, 
                    isAuth, 
                    userData, 
                    userAvatarColor
                }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}