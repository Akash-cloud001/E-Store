import React, { useContext, useState } from 'react'
import '../styles/NavBar.css'
import { UserContext } from '../contexts/Contexts';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const { likes, cart} = useContext(UserContext);

    const [chevClick , setChevClick] = useState(false);
    const [hamburger, setHamburger] = useState(false);

    const categories = ['women', 'men', 'accessories', 'cosmetic'];


    const handleDialogClick = ()=>{
        setChevClick(!chevClick);
    }

    const handleHamburger = ()=>{
        setHamburger(!hamburger)
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
        <aside className={`NavBar-aside ${hamburger===true? 'NavBar-Show': 'NavBar-Hide'}`}>
            <ul className='NavBar-nav'>
                <li><a href=''>Home</a></li>
                <li onClick={handleDialogClick} className='dialog-box-container'>
                    <span>Categories</span>
                    {chevron}
                    <dialog className='dialog-box' id='dialog' open={chevClick}>
                        {categories.map(category => 
                            <Link to={`/home/${category}`} className='category-item' key={category}>
                                {category}
                            </Link>)
                        }
                    </dialog>

                </li>
                <li><a href=''>Contact Us</a></li>
                
            </ul>
            <div className='user-link'>
                    <a href=''><i className="ri-user-line"></i></a>
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