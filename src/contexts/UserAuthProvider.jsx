import React from "react";
import { UserAuthContext } from './Contexts';

// Databse imports
import { auth, db} from '../firebase';
import { 
    doc, 
    setDoc, 
    getDoc
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
    const [submitBtn, setSubmitBtn] = useState(false);
    const [errorFirebase, setErrorFirebase] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState({});
    const [userDbData, setUserDbData] = useState({});


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
            // create userDB in firestore under users collection 
            createUserDB(name,email, user.uid, user.metadata.creationTime);
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
    

    //function to create userDb in firestore
    async function createUserDB(name,email, uid, creationTime){
        //TODO need to done
        const userData = {
            name : name,
            email : email,
            number : 9999999999,
            address : 'add your address',
            cart : [],
            wishlist: [],
            userCreated: creationTime,
        }
        await setDoc(doc(db, 'users', uid), userData);
    }


    async function fetchUserData(uid){
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log('user db data : ', docSnap.data());
            setUserDbData({...docSnap.data()});
        }
        else{
            console.log('no data exists');
        }
    }


    // accessing current user who is authenticated
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          JSON.stringify(user);
          if(user){
            setUserData({...user});
            setIsAuth(true);
            // console.log(user);
            fetchUserData(user.uid);
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
                    userAvatarColor,
                    userDbData
                }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}