import React, {useState, useContext } from 'react';
import { InputControl } from './InputControl';
import '../styles/Sign.css';
import { Link } from 'react-router-dom';
import bg from '../images/OnlineShop.png';
import { UserAuthContext } from '../contexts/Contexts';


const Signin = () => {
    const { submitBtn ,userSignIn, errorFirebase } = useContext(UserAuthContext);

    const [value, setValue] = useState({
        email: '',
        password: '',

    });
    const [error, setError] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        //validation for valid mailFormat
        let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if(value.email==='' || !value.email.match(mailFormat)){
            setError('Enter a Valid mail');
            setTimeout(()=>{
                setValue({email:'', password:''});
                setError('');
            }, 1500);
            return;
        }
        else if(value.password === '' || value.password.length < 6){
            setError("Enter a password");
            setTimeout(()=>{
                setError('');
            }, 1500);
            return;
        }
        //we got here means we got a email and password for sign in a user... form firebase
        userSignIn(value.email, value.password);
        setValue({email:'', password:''});
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
                name = 'Email'
                id = 'email'
                type = 'email'
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
            <button type='submit' className='signin-btn' disabled={submitBtn}>
                Sign In
            </button>

            <footer className='signin-footer'>
                <p>
                    Don't Have an account? <Link to={'/signup'} className='signin-footer-signup-btn'>Sign Up</Link>
                </p>
            </footer>
        </form>
        <img className='signBg'  src= {bg} alt='girl exploring ecommerce website'/>
    </div>
  )
}

export default Signin;