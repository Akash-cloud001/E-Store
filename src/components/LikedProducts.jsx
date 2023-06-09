import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { useNavigate } from 'react-router';
import Gototop from './Gototop';
// Components
import NavBar from './NavBar';
import SingleLikedProduct from './SingleLikedProduct';

// styles and images
import '../styles/SingleLikedProduct.css';
import EmptyList from '../images/EmptyList.png'

// MUI
import Button from '@mui/material/Button';
import Footer from './Footer';

const LikedProducts = () => {
  const { likes } = useContext(UserContext);
  const navigate = useNavigate();


  const LikedProductData = likes.length === 0 ?
   <div className='emptyListDiv'>
    <img src={EmptyList} alt='EmptyListImage' className='EmptyListImage'/> 
    <h1 className='emptyList-header'>
      Wishlist is empty...
    </h1>
    <button onClick={()=> navigate(-1)} className='emptyList-btn'>
      <i className="ri-arrow-left-line"></i>
    </button>
   </div>: 
   <div className='liked-product-root'>
    {likes.map(ele => <SingleLikedProduct {...ele} key={ele.id}/>)}
   </div>

  return (
    <>  
        <NavBar />
        {LikedProductData}
        <Gototop/>
        <Footer />
    </>
  )
}

export default LikedProducts;