import React from 'react'

const NavBar = () => {
    const categories = ['women', 'men', 'children', 'accessories', 'other'];
  return (
    <div className='NavBar'>
        {/* Logo */}
        <h2 className='NavBar-header'>
            E-Store
        </h2>

        {/* Search Bar */}
        <div className='NavBar-Search'>
            <input type='search'></input>
            <button>
                {/* Icon */}
            </button>
        </div>

        {/* NavPannel */}
        <ul className='NavBar-nav'>
            <li><a href=''>Home</a></li>
            <li>
                <select name='categories' id='categories'>
                    {categories.map(category => <option value={categories}>{category}</option>)}
                </select>
            </li>
            <li><a href=''>Contact Us</a></li>
            <li>Profile</li>
            <li>Like</li>
            <li>Cart</li>
        </ul>
    </div>
  )
}

export default NavBar;