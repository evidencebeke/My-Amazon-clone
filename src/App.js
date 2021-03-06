import React, {useEffect} from 'react';
import Header from './Header'
import Home from './Home'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders';


const promise = loadStripe('pk_test_51INgwJJ70jY5kU8E3duMCpPjLjqg0RMcjhnUEMASgSvHfDwWIAV6ZAFvRLG92KGfBhLHxBVjFWNbIdgzf5cXs8Ao00DPcw0L0n')

function App() {
  const [{basket}, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The current user', authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
      
        <Switch >
          <Route path = '/orders' >
            <Orders/>
          </Route>
          <Route path='/login'>
           <Login/>
          </Route>
        <Route path = '/checkout' >
        <Header />
            <Checkout/>
          </Route>
          <Route path = '/payment' >
            <Header />
            <Elements stripe = {promise} >
            <Payment/>
          </Elements>
          </Route>
           
          <Route path='/' >
            <Header />
            <Home />
          </Route>
           
        </Switch>
     
     
    </div>
   </Router>
  );
}

export default App;
