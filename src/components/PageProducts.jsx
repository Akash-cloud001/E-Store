import React from 'react';
import SingleProduct from './SingleProduct';
import '../styles/PageProducts.css';
import NavBar from './NavBar';

const PageProducts = ({products}) => {

  return (
    <>
        <NavBar/>
        <div className='products-container'>
            {/* SingleProduct */}
            {products.map(product => <SingleProduct key={product.id} {...product}/>)}
        </div>
    </>
  )
}

export default PageProducts;