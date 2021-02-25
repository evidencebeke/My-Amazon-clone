import React from 'react'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue()
    return (
        <div className='checkout'>
            <div className="checkout__left">
                <a href="https://betway.com"><img src="https://tpc.googlesyndication.com/simgad/4327643797546709010" alt="" className="checkout__ad" /></a>
                <div className="checkout__title">
                    <h3>{user?.email} </h3>
                    <h2>Your shopping basket</h2>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                 
                    {/* Basket Item */}
                    {/* Basket Item */}
                    {/* Basket Item */}
                    {/* Basket Item */}
                </div>
                
            </div>
            <div className="checkout__right">
                <Subtotal/>

                
            </div>
        </div>
    )
}

export default Checkout
