import React from 'react'
import Gototop from './Gototop';
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import SingleLikedProduct from './SingleLikedProduct';
import EmptyCart from '../images/EmptyCart.png';
import Button from '@mui/material/Button';

const CartPage = () => {
    const { cart } = useContext(UserContext);
    const navigate = useNavigate();

    const CartProductData = cart.length === 0 ?
    <div className='emptyListDiv'>
        <img src={EmptyCart} alt='EmptyCartImage'/> 
        <h1 className='emptyList-header'>
        Cart is empty...
        </h1>
        <Button variant='outlined' onClick={()=> navigate(-1)}>
        <i className="ri-arrow-left-line"></i>
        </Button>
    </div>: 
    <div className='liked-product-root'>
        {cart.map(ele => <SingleLikedProduct {...ele} key={ele.id}/>)}
    </div>


    return (
    <>
        <NavBar />
        {CartProductData}
        <Gototop />
    </>
    )
}

export default CartPage;