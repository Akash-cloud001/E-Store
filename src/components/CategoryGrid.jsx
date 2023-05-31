import React from 'react'
import '../styles/CategoryGrid.css';
import { Link } from 'react-router-dom';
const CategoryGrid = () => {
  return (
    <section className='grid-category'>
            <div className='grid-item grid-women'>
              <Link to="/home/women" className='grid-button'>women</Link>
            </div>
            <div className='grid-item grid-men'>
              <Link to="/home/men" className='grid-button'>men</Link>
            </div>
            <div className='grid-item grid-children'>
              <Link to="/home/accessories" className='grid-button'>accessories</Link>
            </div>
            <div className='grid-item grid-accessory'>
              <Link to='/home/cosmetic' className='grid-button'>cosmetic</Link>
            </div>
            <div className='grid-item grid-cosmetic'>
              <span className='grid-button'> other ...</span>
            </div>
        </section>
  )
}

export default CategoryGrid;