import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import SingleLikedProduct from './SingleLikedProduct';

const LikedProducts = () => {
  const { likes } = useContext(UserContext);
  console.log(likes);
  return (
    <>
        {likes.length !==0 && likes.map(ele => <SingleLikedProduct {...ele}/>)}
    </>
  )
}

export default LikedProducts;