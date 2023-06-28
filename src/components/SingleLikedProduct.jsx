import React from 'react'
import '../styles/SingleLikedProduct.css';
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';

const SingleLikedProduct = ({id,title,price,finalPrice, image, description}) => {
  const {removeLikedProducts} = useContext(UserContext);

  return (
    <div className='single-liked-container'>
        <img className='liked-image' src={image} alt={title}/>
        <aside className='liked-aside'>
            <h3 className='liked-title'>
                {title}
            </h3>
            <div className='liked-cost'>
                <h4 className='liked-price'>{price}</h4>
                <h3 className='liked-final-price'>{finalPrice}$</h3>
            </div>
            <p className='liked-desc'>
                {description}
            </p>
            <div className='liked-btns'>
                <button 
                    className='liked-buy'
                >
                    Buy
                </button>
                <button 
                    className='liked-remove'
                    onClick={()=>{removeLikedProducts(id)}}
                >
                    Remove
                </button>

            </div>
        </aside>
    </div>
  )
}

export default SingleLikedProduct;