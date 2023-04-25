import React from 'react'
import '../styles/NavBar.css'
const NavBar = () => {
    const categories = ['women', 'men', 'children', 'accessories', 'other'];
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
                    <i class="ri-search-2-line"></i>
                </button>
            </form>
            <li><a href=''>Home</a></li>
            <li>
                <select name='categories' id='categories' >
                    <option style={{display:'none'}}  disabled selected>Categories</option>
                    {categories.map(category => 
                        <option value={categories}>
                            {category}
                        </option>)
                    }
                </select>
            </li>
            <li><a href=''>Contact Us</a></li>
            
        </ul>
        <div className='user-link'>
                <a href=''><i class="ri-user-line"></i></a>
                <a href=''><i class="ri-heart-line"></i></a>
                <a href=''><i class="ri-shopping-cart-line"></i></a>
        </div>
    </div>
  )
}

export default NavBar;