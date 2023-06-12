import React, { useContext, useState } from 'react';
import '../styles/SingleProduct.css';
import { UserContext } from '../contexts/Contexts';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const SingleProduct = ({id,image,title,description,price}) => {

  const { handleSetLikes, handleCartItem} = useContext(UserContext);
  const [likeOpen, setLikeOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);




  let currency = '$'; //future update if we go globally we would change it as per country
  let desc = ''; // to keep the description in 50 words
  let discount = 20;
  const finalPrice = (price - (price * discount / 100)).toFixed(2);
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
  let alreadyLiked = false;
  const handleLikeButton = ()=>{
    handleLikeClick();
    const likedProduct = {
      'id':id,
      'image':image,
      'title':title,
      'description': description,
      'price':price,
      'finalPrice' : finalPrice
    };
    handleSetLikes(likedProduct);
  }

  const handleCartButton = ()=>{
    handleCartClick();
    const cartProduct = {
      'id':id,
      'image':image,
      'title':title,
      'description': description,
      'price':price,
      'finalPrice' : finalPrice
    };
    handleCartItem(cartProduct);
  }


  const handleLikeClick = () => {
    setLikeOpen(true);
  };
  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleLikeClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setLikeOpen(false);
  };
  const handleCartClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCartOpen(false);
  };
  const likeAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleLikeClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const cartAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleLikeClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  
  return (
    <div className='singleProduct-container'>
        <img className='product-img' src={image}/>
        <h4 className='product-name'>{title}</h4>
        
        <div className='product-cost'>
            <span className={`product-price ${discount !== 0 ? 'line-through': ''}`}>
              {price} {currency}
            </span>
            <span className='product-discount'>{discount!==0 && finalPrice} {discount!==0 && currency}</span>
        </div>
        <p className='product-desciption'>{desc}</p>
        <div className='product-action'>
            <button className='like-btn' onClick={handleLikeButton}>
              <i className='ri-heart-3-fill'></i>
            </button>
              <Snackbar
                open={likeOpen}
                autoHideDuration={1000}
                onClose={handleLikeClose}
                message="Added to wishlist"
                action={likeAction}
              />
            <button className='cart-btn' onClick={handleCartButton}>
              <i className="ri-shopping-cart-fill"></i>
            </button>
            <Snackbar
                open={cartOpen}
                autoHideDuration={1000}
                onClose={handleCartClose}
                message="Added to Cart"
                action={cartAction}
              />
        </div>
    </div>
  )
}

export default SingleProduct;