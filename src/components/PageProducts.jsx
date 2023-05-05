import React from 'react';
import SingleProduct from './SingleProduct';
import {MEN_PRODUCTS,COSMETIC_PRODUCTS,WOMEN_PRODUCTS,ACCESSORIES_PRODUCTS} from '../ProductsList.js';
const HomePageProducts = () => {
  return (
    <>
        <h2>Popular Products</h2>
        <div className='products-container'>
            {/* SingleProduct */}
            {MEN_PRODUCTS.map(product => <SingleProduct key={product.id} {...product}/>)}
        </div>
    </>
  )
}

export default HomePageProducts;