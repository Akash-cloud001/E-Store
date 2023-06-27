import React from 'react';
import SingleProduct from './SingleProduct';
import '../styles/PageProducts.css';
import NavBar from './NavBar';
import Gototop from './Gototop';
import Footer from './Footer';

const PageProducts = ({products}) => {
  return (
    <>
        <NavBar/>
        <div className='products-container'>
            {/* SingleProduct */}
            {products?.map(product => <SingleProduct key={product.id} {...product}/>)}
            <Gototop/>
        </div>
        <Footer />
    </>
  )
}

export default PageProducts;