import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Button } from '@mui/material';

const CartProduct = ({id,title,price,finalPrice, image, description}) => {
  const {removeCartItem} = useContext(UserContext);

  return (
    <div className='cart-product-container'>
        <img className='cart-item-image' src={image} alt={title}/>
        <aside className='cart-item-aside'>
            <h3 className='cart-item-title'>
                {title}
            </h3>
            <div className='cart-item-cost'>
                <h4 className='cart-item-price'>{price}</h4>
                <h3 className='cart-item-final-price'>{finalPrice}</h3>
            </div>
            <p className='cart-item-desc'>
                {description}
            </p>
            <div className='cart-item-btns'>
                <button 
                    className='cart-item-buy'
                >
                    Buy
                </button>
                <button 
                    className='cart-item-remove'
                    onClick={()=>{removeCartItem(id,finalPrice)}}
                >
                    Remove
                </button>

            </div>
        </aside>
    </div>
  )
}

export default CartProduct;