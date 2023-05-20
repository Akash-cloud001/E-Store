import React from 'react';
import SingleProduct from './SingleProduct';
import '../styles/PageProducts.css';

const PageProducts = ({products}) => {

  return (
    <>
        <h2>Filter</h2>
        <div className='products-container'>
            {/* SingleProduct */}
            {products.map(product => <SingleProduct key={product.id} {...product}/>)}
        </div>
    </>
  )
}

export default PageProducts;