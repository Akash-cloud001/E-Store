import React from 'react'
import '../styles/CategoryGrid.css';
const CategoryGrid = () => {
  return (
    <section className='grid-category'>
            <div className='grid-item grid-women'>
              <button className='grid-button'>Women</button>
            </div>
            <div className='grid-item grid-men'>
              <button className='grid-button'>Men</button>
            </div>
            <div className='grid-item grid-children'>
              <button className='grid-button'>Children</button>
            </div>
            <div className='grid-item grid-accessory'>
              <button className='grid-button'>Accessory</button>
            </div>
            <div className='grid-item grid-cosmetic'>
              <button className='grid-button'>Cosmetic</button>
            </div>
        </section>
  )
}

export default CategoryGrid;