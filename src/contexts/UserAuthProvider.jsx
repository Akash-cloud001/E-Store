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
            // fetchUserData(userData.uid);            
            setTimeout(()=>{
                navigate('/');
            },1000);

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
            number : ' ',
            address : " ",
            cart : [],
            wishlist: [],
            userCreated: creationTime,
            uid: uid
        }
        await setDoc(doc(db, 'users', uid), userData);
    }


    async function fetchUserData(uid){
        try{
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            console.log('user db data : ', docSnap.data());
            setUserDbData({...docSnap.data()});
        }
        catch(err){
            console.log(err);
        }
    }

    async function updateUserProfile(add, num){
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

    // accessing current user who is authenticated
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          JSON.stringify(user);
          if(user){
            setUserData({...user});
            setIsAuth(true);
            fetchUserData(user.uid);
            setUserAvatar((prev)=>({
                userName : user.displayName,
                userColor : chooseRandomColor()
            }));
          }
        });
      }, []);


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
                    updateUserProfile
                }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}