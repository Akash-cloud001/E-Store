import React, { useContext } from 'react';
import '../styles/SingleProduct.css';
import { UserContext } from '../contexts/Contexts';

const SingleProduct = ({id,image,title,description,price}) => {

  const {likes, handleSetLikes} = useContext(UserContext);

  let currency = '₹'; //future update if we go globally we would change it as per country
  let desc = ''; // to keep the description in 50 words
  let discount = 20;
  let finalPrice = (price - (price * discount / 100)).toFixed(2);
  let count = 0;
  let word = '';
  if(description.length >= 15){
    for(let i = 0 ; i < description.length; i++){
      desc += description[i];
      if(description[i] === ' '){
        count++;
      }
      if(count === 30){
        desc += '...';
        break;
      }
    }
  }
  else{
    desc = description;
  }


  const handleLikeButton = ()=>{
    const likedProduct = {
      'id':id,
      'image':image,
      'title':title,
      'description': description,
      'price':price
    };
    handleSetLikes(likedProduct);
  }

//  rating system
// <i className="ri-star-fill"></i>  filled star 
//  <i className="ri-star-half-line"></i> half filled star
//  <i className="ri-star-line"></i> empty star 


  return (
    <div className='singleProduct-container'>
        <img className='product-img' src={image}/>
        <h4 className='product-name'>{title}</h4>
        
        {/* <div className='product-rating'>

        </div> */}

        <div className='product-cost'>
            <span className={`product-price ${discount !== 0 ? 'line-through': ''}`}>{price} {currency}</span>
            <span className='product-discount'>{discount!==0 && finalPrice} {discount!==0 && currency}</span>
        </div>
        <p className='product-desciption'>{desc}</p>
        <div className='product-action'>
            <button className='like-btn' onClick={handleLikeButton}>
              <i className="ri-heart-3-line"></i>
            </button>
            <button className='cart-btn'>
              <i className="ri-shopping-cart-line"></i>
            </button>
        </div>
    </div>
  )
}

export default SingleProduct;