import React from 'react'
import Gototop from './Gototop';
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import CartProduct from './CartProduct';
import SingleLikedProduct from './SingleLikedProduct';
import EmptyCart from '../images/EmptyCart.png';
import Button from '@mui/material/Button';

const CartPage = () => {
    const { cart, totalAmt } = useContext(UserContext);
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
        {cart.map(ele => <CartProduct {...ele} key={ele.id}/>)}
    </div>

    let totalCost = 0;
    if(cart.length){
        for(let i = 0 ; i < cart.length; i++){
            totalCost += cart[i].finalPrice;
        }
    }

    return (
    <>
        <NavBar />
        <section>
            {CartProductData}
            <aside className='total-container'>
                <table>
                    <thead>
                    <tr>
                        <th align='left'>
                            Product Name
                        </th>
                        <th>
                            Price
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map(item=>
                    
                        <tr key={item.id}>
                            <td align='left'>{item.title}</td>
                            <td align='right'>{item.finalPrice}</td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>
                                
                            </th>
                            <th align='left'>
                                +
                            </th>
                        </tr>
                    
                        <tr>
                            <th align='left'>
                                Total Amount
                            </th>
                            <th align='right'>
                                {totalAmt}
                            </th>
                        </tr>
                    </tfoot>
                    {/*  TODO create a table with name of the product and price a */}
                </table>
            </aside>
        </section>
        <Gototop />
    </>
    )
}

export default CartPage;