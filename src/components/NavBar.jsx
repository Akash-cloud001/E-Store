import React, { useContext, useState } from 'react'
import '../styles/NavBar.css';

import { UserContext, UserAuthContext } from '../contexts/Contexts';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { isAuth, userData } = useContext(UserAuthContext);



    const { likes, cart} = useContext(UserContext);

    const [chevClick , setChevClick] = useState(false);
    const [hamburger, setHamburger] = useState(false);

    const categories = ['women', 'men', 'accessories', 'cosmetic'];


    const handleDialogClick = ()=>{
        setChevClick(!chevClick);
    }

    const handleHamburger = (e)=>{
        setHamburger(!hamburger);
        setChevClick(false);
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
            </div>
        </aside>
        <button className='toggle-button' onClick={handleHamburger}>
            {!hamburger ? <i class="ri-menu-fold-line"></i> : <i class="ri-menu-unfold-line"></i>}
        </button>
    </div>
  )
}

export default NavBar;