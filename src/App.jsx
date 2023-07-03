import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound';
import PageProducts from './components/PageProducts';
import LikedProducts from './components/LikedProducts';
import CartPage from './components/CartPage';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Loader from './components/Loader';
import { UserAuthContext } from './contexts/Contexts';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';


function App() {
  const {isAuth, isNotFetched} = useContext(UserAuthContext);
  const [men, setMen] = useState({});
  const [women, setWomen] = useState({});
  const [accessories, setAccessories] = useState({});
  const [cosmetic, setCosmetic] = useState({});

  const fetchMenData = async ()=>{
    await getDocs(collection(db, 'productList/men/p1'))
    .then((qs)=>{
      const menData = qs.docs.map((doc) => ({...doc.data()}));
      setMen(menData);
    })
    .catch((err)=>console.log(err));
  }
  const fetchWomenData = async ()=>{
    await getDocs(collection(db, 'productList/women/p1')).then((qs)=>{
      const womenData = qs.docs.map((doc) => ({...doc.data()}));
      setWomen(womenData);
    })
    .catch((err)=>console.log(err));
  }

  const fetchAccessoriesData = async ()=>{
    getDocs(collection(db, 'productList/accessories/p1')).then((qs)=>{
      const accessoriesData = qs.docs.map((doc) => ({...doc.data()}));
      setAccessories(accessoriesData);
    })
    .catch((err)=>console.log(err));
  }

  const fetchCosmeticData = async ()=>{
    await getDocs(collection(db, 'productList/cosmetic/p1')).then((qs)=>{
      const cosmeticData = qs.docs.map((doc) => ({...doc.data()}));
      setCosmetic(cosmeticData);
    })
    .catch((err)=>console.log(err));
  }
  useEffect( ()=>{
     fetchMenData();
     fetchWomenData();
     fetchAccessoriesData();
     fetchCosmeticData();
  },[]);


function loading(){
  return(
    <p>Loading ... </p>
  )
}

  if(isNotFetched){
    return <Loader />
  }


  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path={`/user/:userId`} element={<UserProfile />}/>
          <Route path='/home/women' element={<PageProducts products={women}/>}/>
          <Route path='/home/men' element={<PageProducts products={men}/>}/>
          <Route path='/home/accessories' element={<PageProducts products={accessories}/>}/>
          <Route path='/home/cosmetic' element={<PageProducts products={cosmetic} />}/>
          <Route path='/home/liked-products' element={<LikedProducts />} />
          <Route path='/home/cart' element={<CartPage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
  )
}

export default App;
