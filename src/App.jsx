import { useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { Route, Routes,Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound';
import PageProducts from './components/PageProducts';
import { WOMEN_PRODUCTS, MEN_PRODUCTS, ACCESSORIES_PRODUCTS, COSMETIC_PRODUCTS} from './ProductsList';
import LikedProducts from './components/LikedProducts';
import CartPage from './components/CartPage';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import { UserAuthContext } from './contexts/Contexts';
function App() {
  const {isAuth} = useContext(UserAuthContext);
  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<UserProfile />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path={`/user/:userId`} element={<UserProfile />}/>
          <Route path='/home/women' element={<PageProducts products={WOMEN_PRODUCTS}/>}/>
          <Route path='/home/men' element={<PageProducts products={MEN_PRODUCTS}/>}/>
          <Route path='/home/accessories' element={<PageProducts products={ACCESSORIES_PRODUCTS}/>}/>
          <Route path='/home/cosmetic' element={<PageProducts products={COSMETIC_PRODUCTS} />}/>
          <Route path='/home/liked-products' element={<LikedProducts />} />
          <Route path='/home/cart' element={<CartPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
  )
}

export default App;
