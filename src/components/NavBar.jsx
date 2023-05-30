import React, { useContext, useState } from 'react'
import '../styles/NavBar.css'
import { UserContext } from '../contexts/Contexts';

const NavBar = () => {
    const { likes, handleSetLikes} = useContext(UserContext);
    const [chevClick , setChevClick] = useState(false);
    const categories = ['women', 'men', 'children', 'accessories', 'cosmetic'];
    const handleDialogClick = ()=>{
        setChevClick(!chevClick);
    }
    const chevron = chevClick ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>;
  return (
    <div className='NavBar'>
        {/* Logo */}
        <h2 className='NavBar-header'>
            E-Store
        </h2>
        <ul className='NavBar-nav'>
            <form className='NavBar-Search'>
                <input type='search' placeholder='search'></input>
                <button type='submit'>
                    {/* Icon */}
                    <i className="ri-search-2-line"></i>
                </button>
            </form>
            <li><a href=''>Home</a></li>
            <li onClick={handleDialogClick} className='dialog-box-container'>
                <span>Categories</span>
                {chevron}
                 <dialog className='dialog-box' id='dialog' open={chevClick}>
                    {categories.map(category => 
                        <div className='category-item'>
                            {category}
                        </div>)
                    }
                </dialog>

            </li>
            <li><a href=''>Contact Us</a></li>
            
        </ul>
        <div className='user-link'>
                <a href=''><i className="ri-user-line"></i></a>
                <a href=''>
                    <i className="ri-heart-line"></i>
                    <sup className='user-link-like'>{likes.length===0?'':likes.length}</sup>
                </a>
                <a href=''><i className="ri-shopping-cart-line"></i></a>
        </div>
    </div>
  )
}

export default NavBar;