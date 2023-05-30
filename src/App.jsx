import { Route, Routes,Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound';
import PageProducts from './components/PageProducts';
import { WOMEN_PRODUCTS, MEN_PRODUCTS, ACCESSORIES_PRODUCTS, COSMETIC_PRODUCTS} from './ProductsList';
import { UserProvider } from './contexts/UserProvider';
function App() {

  return (
    <div className='App'>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/women' element={<PageProducts products={WOMEN_PRODUCTS}/>}/>
          <Route path='/men' element={<PageProducts products={MEN_PRODUCTS}/>}/>
          <Route path='/accessories' element={<PageProducts products={ACCESSORIES_PRODUCTS}/>}/>
          <Route path='/cosmetic' element={<PageProducts products={COSMETIC_PRODUCTS} />}/>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </UserProvider>
    </div>
  )
}

export default App;
