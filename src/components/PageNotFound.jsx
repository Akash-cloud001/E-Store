import React from 'react';
import '../styles/PageNotFound.css';
import pageNotFound from '../images/pageNotFound.png';
const PageNotFound = () => {
  return (
    <div className='pageNotFoundContainer'>
        <img alt='404 Image' src={pageNotFound}/>
        <h2>Page Not Found !!</h2>
    </div>
  )
}

export default PageNotFound;