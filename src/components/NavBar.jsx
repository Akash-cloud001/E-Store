import React, { useContext, useState } from 'react'
import '../styles/NavBar.css';

import { UserContext, UserAuthContext } from '../contexts/Contexts';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    const { isAuth, userData, userSignOut } = useContext(UserAuthContext);
    const navigate = useNavigate();


    const { likes, cart} = useContext(UserContext);

    const [chevClick , setChevClick] = useState(false);
    const [hamburger, setHamburger] = useState(false);
    const [open, setOpen] = useState(false);

    const categories = ['women', 'men', 'accessories', 'cosmetic'];


    const handleDialogClick = ()=>{
        setChevClick(!chevClick);
    }

    const handleHamburger = (e)=>{
        setHamburger(!hamburger);
        setChevClick(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleUserSignOut = (e)=>{
        e.preventDefault();
        setOpen(false);
        navigate('/');
        userSignOut();
    }


    const chevron = chevClick ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>;
  return (
    <div className='NavBar'>
        {/* Logo */}
        <h2 className='NavBar-header'>
            E-Store
        </h2>
        <form className='NavBar-Search'>
            <input type='search' placeholder='search'></input>
            <button type='submit'>
                {/* Icon */}
                <i className="ri-search-2-line"></i>
            </button>
        </form>
        <aside className={`NavBar-aside ${hamburger===true? 'NavBar-Show': 'NavBar-Hide'}`} >
            <ul className='NavBar-nav'>
                <li><Link to={'/'} href=''>Home</Link></li>
                <li onClick={handleDialogClick} className='dialog-box-container'>
                    <span>Categories</span>
                    {chevron}
                    <dialog className='dialog-box' id='dialog' open={chevClick}>
                        {categories.map(category => 
                            <Link to={`/home/${category}`} className='category-item' key={category} onClick={()=>{setHamburger(false)}}>
                                {category}
                            </Link>)
                        }
                    </dialog>

                </li>
                <li><a href=''>Contact Us</a></li>
                
            </ul>
            <div className='user-link'>
                        {/* TODO 
                            1. get user logged in
                            2. after logged in show user profile page
                            3. show signout button after user is logged in
                            4. if not logged in don't redirect to user profile page
                        */}
                    {isAuth? <Link to={`user/${userData.uid}`}>
                        <i className="ri-user-line"></i>
                    </Link> 
                    :
                    <Link to='/signin'>
                        <i className="ri-user-line"></i>
                    </Link>}
                    <Link to='/home/liked-products'>
                        <i className="ri-heart-line"></i>
                        <sup className={`user-link-like ${likes.length === 0 ? 'user-link-like-has-no-data' : 'user-link-like-has-data'}`}></sup>
                    </Link>
                    <Link to='/home/cart'>
                        <i className="ri-shopping-cart-line"></i>
                        <sup className={`user-link-like ${cart.length === 0 ? 'user-link-like-has-no-data' : 'user-link-like-has-data'}`}></sup>
                    </Link>
                    {isAuth? 
                        <>
                            <button className='user-signing' onClick={handleClickOpen} >
                                {/* <i className="ri-logout-circle-r-line"></i> */}
                                <LogoutIcon />
                            </button> 
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                // PaperProps={{sx : {position:'fixed', background:'yellow'}}}
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Are you sure you wish to logout?"}
                                </DialogTitle>
                                {/* <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you wish to logout?
                                </DialogContentText>
                                </DialogContent> */}
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
                                    onClick={handleUserSignOut} 
                                    autoFocus>
                                        <CheckIcon/>
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                        : 
                        <Link to='/signin' className='user-signing'>
                            <LoginIcon />
                        </Link>
                    }
            </div>
        </aside>
        <button className='toggle-button' onClick={handleHamburger}>
            {!hamburger ? <i class="ri-menu-fold-line"></i> : <i class="ri-menu-unfold-line"></i>}
        </button>
    </div>
  )
}

export default NavBar;