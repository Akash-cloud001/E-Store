import React from 'react';
import '../styles/Home.css';
import girl from '../images/girl.svg';
import boy from '../images/boy.svg';
import cart from '../images/cart.svg';
import phone from '../images/phone.svg';
import NavBar from './NavBar';
import Footer from './Footer';
import CategoryGrid from './CategoryGrid';

const Home = () => {
  return (
    <div className='Home'>
        <NavBar />
        <main className='hero'>
          <div className='hero-header'>
            <p className='hero-header-p1'>discover</p>
            <p className='hero-header-p2'>
              <span>The</span> &nbsp;
              <span>Best</span>
            </p>
          </div>
          {/* <img src={bg} className='hero-img'/> */}
          <div className='hero-art'>
            <img src={girl} className='hero-img hero-girl'/>
            <img src={boy} className='hero-img hero-boy'/>
            <img src={cart} className='hero-img hero-cart'/>
            <img src={phone} className='hero-img hero-phone'/>
            
          </div>
        </main>
        <CategoryGrid />
        {/* HomePageProducts */}

        {/* <Footer /> */}
    </div>
  )
}

export default Home;