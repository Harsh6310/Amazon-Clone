import React, { useEffect } from 'react' ;
import Header from './Header' ;
import Home from './Home' ;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' ;
import Checkout from './Checkout' ;
import Login from './Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import './App.css';
import Footer from './Footer'
import Payment from './Payment'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Orders'

const promise = loadStripe('pk_test_51L3nXYSHob9ti035E2pnwJqFKCgvzuGUB27Kft3kiWHJQ5aOXcVhzgYjsEoPlcS6PXKxc9daVEC0l1kCVEUN1CML0045gP0r6X') ;

function App() {

  const [{}, dispatch] = useStateValue() ;

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log ('user is authorised ==> ', authUser) ;
      if(authUser){
        dispatch({
          type: 'set-user',
          user: authUser
        })
      }else {
        dispatch({
          type: 'set-user',
          user: null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/login' element={<>
            <Login />
          </>} />
          <Route path='/checkout' element={<>
            <Header />
            <Checkout />
            <Footer />
          </>}/>
          <Route path='/orders' element={<>
              <Header />
              <Orders />
              <Footer />
          </>}/>
          <Route path='/payment' element={<>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements >
            <Footer />
          </>}/>
          <Route path="/" element={<>
            <Header />
            <Home/>
            <Footer />
          </>}/>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
