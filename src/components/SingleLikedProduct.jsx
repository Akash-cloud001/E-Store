import React from 'react'
import '../styles/SingleLikedProduct.css';
const SingleLikedProduct = ({id,title,price,finalPrice, image, description}) => {
  return (
    <div className='liked-products-container'>
        <img className='liked-image' src={image} alt={title}/>
        <aside className='liked-aside'>
            <h3 className='liked-title'>
                {title}
            </h3>
            <div className='liked-cost'>
                <h4 className='liked-price'>{price}</h4>
                <h3 className='liked-final-price'>{finalPrice}</h3>
            </div>
            <p className='liked-desc'>
                {description}
            </p>
            <div className='liked-btns'>
                <button className='liked-buy'>Buy</button>
                <button className='liked-remove'>Remove</button>
            </div>
        </aside>
    </div>
  )
}

export default SingleLikedProduct;