import React, {useState} from 'react'
import Gototop from './Gototop';
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import CartProduct from './CartProduct';
import EmptyCart from '../images/EmptyCart.png';
import Button from '@mui/material/Button';
import '../styles/CartPage.css';
import Footer from './Footer';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [totalAmt, setTotalAmt] = useState(0);
    
    const handleClickOpen = () => {
        setOpen(true);
      };
      
      const handleClose = () => {
        setOpen(false);
      };


    return (
    <>
        <NavBar />
        {cart.length === 0 ? 
        <div className='emptyCartDiv'>
            <img src={EmptyCart} alt='EmptyCartImage' className='EmptyCartImage'/> 
            <h1 className='emptyCart-header'>
            Cart is empty...
            </h1>
            <button onClick={()=> navigate(-1)} className='emptyCart-btn'>
            <i className="ri-arrow-left-line"></i>
            </button>
        </div>  :
        <section className='cart-section'>
            {
                <div className='cart-items-container'>
                {cart.map(ele => <CartProduct {...ele} key={ele.id}/>)}
                </div>
            }
            <table className='total-table' style={{display:`${cart.length!==0? 'grid' : 'none'}`}}>
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
                        <th align='right' colSpan={2}>
                            +
                        </th>
                    </tr>
                
                    <tr>
                        <th align='left'>
                            Total Amount
                        </th>
                        <th align='right'>
                            {totalAmt}$
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={2} align='center' className='table-btn'>
                            <button onClick={handleClickOpen}>
                                Buy All Now
                            </button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Thanks For Shopping From E-Store"}
                                </DialogTitle>
                                <DialogActions>
                                <Button 
                                    className='dialog-btn'
                                    size='small' 
                                    variant='outlined' 
                                    color='error' 
                                    onClick={handleClose}
                                    >
                                        <ClearIcon />
                                    </Button>
                                <Button 
                                    className='dialog-btn'
                                    size='small' 
                                    variant='outlined' 
                                    color='success' 
                                    onClick={()=>{navigate('/'); handleClose() }} 
                                    autoFocus>
                                        <CheckIcon/>
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </section>
    }
        
        <Gototop />
        <Footer />
    </>
    )
}

export default CartPage;