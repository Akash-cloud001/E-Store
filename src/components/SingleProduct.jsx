import React from 'react';

const SingleProduct = ({image,title,description,price,}) => {
  return (
    <div className='singleProduct-container'>
        <img className='product-img' height='300px' src={image}/>
        <h4 className='product-name'>{title}</h4>
        <h5 className='product-desciption'>{description}</h5>
        <div className='product-cost'>
            <span>{price}</span>
            <span>Discount</span>
        </div>
        <div className='product-action'>
            <button>Like</button>
            <button>Cart</button>
        </div>
    </div>
  )
}

export default SingleProduct;