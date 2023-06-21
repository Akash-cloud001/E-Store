import React, { useState, useContext } from 'react';
import { InputControl } from './InputControl';
import '../styles/Sign.css';
import { Link } from 'react-router-dom';
import bg from '../images/OnlineShop.png';
import { UserAuthContext } from '../contexts/Contexts';

const SignUp = () => {
    const { submitBtn ,userSignUp, errorFirebase } = useContext(UserAuthContext);
    
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
        rewritePassword: '',

    });
    const [error, setError] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        //validation for valid mailFormat
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.name===''){
            setError('Please Enter your name');
            setTimeout(()=>{
                setError('');
            }, 1500);
            return;
        }
        else if(value.email==='' || !value.email.match(mailFormat)){
            setError('Enter a Valid mail');
            setTimeout(()=>{
                setValue({email:'', password:'', rewritePassword:''});
                setError('');
            }, 1500);
            return;
        }
        else if(value.password !== value.rewritePassword){
            setError("Password doesn't match");
            setTimeout(()=>{
                setValue((prev)=>({...prev, password: '', rewritePassword: ''}));
                setError('');
            }, 1500);
            return;
        }
        //if comes here means we have validated email && password now need to connect it with firebase ..
        userSignUp(value.name ,value.email, value.password);
        setValue({name:'',email:'', password:'', rewritePassword:''});
    }


  return (
    <div className='signin-form-container'>

        <form className='signin-form' onSubmit={handleSubmit}>
            {error === ''? null :
                <p className='signin-error'>
                    {error}
                </p>
            }
            {errorFirebase === ''? null: 
                <p className='signin-error'>
                    {errorFirebase}
                </p>
            }
            <InputControl
                name = 'name'
                id = 'name'
                type = 'text'
                onChange={event =>
                    setValue((prev) => ({...prev, name: event.target.value}))
                }
                value = {value.name}
            />
            <InputControl
                name = 'email'
                id = 'email'
                type = 'text'
                onChange={event =>
                    setValue((prev) => ({...prev, email: event.target.value}))
                }
                value = {value.email}
            />
            <InputControl
                name = 'password'
                id = 'password'
                type = 'password'
                onChange={event =>
                    setValue((prev)=>({...prev, password: event.target.value}))
                }
                value = {value.password}
            />
            <InputControl
                name = 'rewrite-password'
                id = 'rewrite-password'
                type = 'password'
                onChange={event =>
                    setValue((prev)=>({...prev, rewritePassword: event.target.value}))
                }
                value = {value.rewritePassword}
            />
            <button type='submit' className='signin-btn' disabled={submitBtn}>
                Sign Up
            </button>

            <footer className='signin-footer'>
                <p>
                     Have an account? <Link to={'/signin'}className='signin-footer-signup-btn'>Sign in</Link>
                </p>
            </footer>
        </form>
        <img className='signBg'  src= {bg} alt='girl exploring ecommerce website'/>
    </div>
  )
}

export default SignUp;