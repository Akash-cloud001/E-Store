import React, { useContext, useState } from 'react';
import '../styles/SingleProduct.css';
import { UserAuthContext, UserContext } from '../contexts/Contexts';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';



const SingleProduct = ({id,img,title,desc,price}) => {
  const {isAuth} = useContext(UserAuthContext);
  const { handleSetLikes, handleCartItem} = useContext(UserContext);
  const [likeOpen, setLikeOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  //Dialog
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleRedirect = () => {
    navigate('/signin')
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let currency = '$'; //future update if we go globally we would change it as per country
  let description = ''; // to keep the description in 50 words
  let discount = 20;
  const finalPrice = (price - (price * discount / 100)).toFixed(2);
  let count = 0;
  if(desc.length >= 15){
    for(let i = 0 ; i < desc.length; i++){
      description += desc[i];
      if(desc[i] === ' '){
        count++;
      }
      if(count === 30){
        description += '...';
        break;
      }
    }
  }
  else{
    description = desc;
  }
  const handleLikeButton = ()=>{
    handleLikeClick();
    const likedProduct = {
      'id':id,
      'image':img,
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
      'image':img,
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
        <img className='product-img' src={img}/>
        <h4 className='product-name'>{title}</h4>
        
        <div className='product-cost'>
            <span className={`product-price ${discount !== 0 ? 'line-through': ''}`}>
              {price} {currency}
            </span>
            <span className='product-discount'>{discount!==0 && finalPrice} {discount!==0 && currency}</span>
        </div>
        <p className='product-desciption'>{description}</p>
        <div className='product-action'>
            {isAuth ? 
              <button className='like-btn' onClick={handleLikeButton}>
                <i className='ri-heart-3-fill'></i>
              </button>
              :
              <>
                <button className='like-btn' onClick={handleOpen}>
                <i className='ri-heart-3-fill'></i>
              </button>
              <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id="alert-dialog-title">
                  {"Need to Sign-in for this action"}
                  </DialogTitle>
                  <DialogActions>
                  <Button 
                      className='dialog-btn'
                      size='small' 
                      variant='outlined' 
                      color='error' 
                      onClick={handleClose}
                      >
                         Continue
                      </Button>
                  <Button 
                      className='dialog-btn'
                      size='small' 
                      variant='outlined' 
                      color='success' 
                      onClick={handleRedirect} 
                      autoFocus>
                          Sign In
                  </Button>
                  </DialogActions>
              </Dialog>
              </>
            }
            
              <Snackbar
                open={likeOpen}
                autoHideDuration={1000}
                onClose={handleLikeClose}
                message="Added to wishlist"
                action={likeAction}
              />


            {isAuth ? 
              <button className='cart-btn' onClick={handleCartButton}>
                <i className="ri-shopping-cart-fill"></i>
              </button> 
              : 
              <>
                <button className='cart-btn' onClick={handleOpen}>
                <i className="ri-shopping-cart-fill"></i>
              </button>
              <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
              >
                  <DialogTitle id="alert-dialog-title">
                  {"Need to Sign-in for this action"}
                  </DialogTitle>
                  <DialogActions>
                  <Button 
                      className='dialog-btn'
                      size='small' 
                      variant='outlined' 
                      color='error' 
                      onClick={handleClose}
                      >
                         Continue
                      </Button>
                  <Button 
                      className='dialog-btn'
                      size='small' 
                      variant='outlined' 
                      color='success' 
                      onClick={handleRedirect} 
                      autoFocus>
                          Sign In
                  </Button>
                  </DialogActions>
              </Dialog>
              </>

            }
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