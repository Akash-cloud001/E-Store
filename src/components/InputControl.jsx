import React, { useState } from 'react'
import '../styles/InputControl.css';
export const InputControl = (props) => {
    const [visible,setVisible] = useState(false);

    const handleVisibility = (event)=>{
        const password = document.querySelector('#password');
        if( !visible ){
            password.setAttribute("type", 'text');
        }
        else{
            password.setAttribute("type", 'password');
        }
        setVisible(!visible);
    }
  return (
    <div className='input-control-div' >
        {props.name && <label className='input-control-label' htmlFor='props.name'>{props.name}</label>}
        <br />
        <input 
           {...props}
           className='input-control-input'
        />
        {props.type === 'password' && 
            <span onClick={handleVisibility} className='input-control-span'>
                {visible ? <i className="ri-eye-off-line"></i> :  <i className="ri-eye-line"></i>}
            </span>
        }
        
    </div>
  )
}
