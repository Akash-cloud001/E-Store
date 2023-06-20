import React, {useState} from 'react';
import { InputControl } from './InputControl';
import '../styles/Sign.css';
import { Link } from 'react-router-dom';
import bg from '../images/OnlineShop.png';
const Signin = () => {
    const [value, setValue] = useState({
        email: '',
        pass: '',

    });
    const [error, setError] = useState('');
  return (
    <div className='signin-form-container'>

        <form className='signin-form'>
            {error === ''? null :
                <p className='signin-error'>
                    Fill Field Correctly
                </p>
            }
            <InputControl
                name = 'Email'
                id = 'email'
                type = 'text'
                onChange={event =>
                    setValue((prev) => ({...prev, email: event.target.value}))
                }
            />
            <InputControl
                name = 'password'
                id = 'password'
                type = 'password'
                onChange={event =>
                    setValue((prev)=>({...prev, pass: event.target.value}))
                }
            />
            <button type='submit' className='signin-btn'>
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