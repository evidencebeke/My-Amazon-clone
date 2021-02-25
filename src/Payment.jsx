import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import axios from './axios'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, useHistory } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { getBasketTotal } from './reducer'
import {useStateValue} from './StateProvider'

function Payment() {
    const stripe = useStripe()
    const history = useHistory()

    
    const elements = useElements()
    
    const [{ basket, user }, dispatch] = useStateValue()

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [processing, setProcessing] = useState('')
    const [succeeded, setSucceeded] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    const [deliveryAddress, setDeliveryAddress] = useState('')

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])
    console.log('The secret is >>>>', clientSecret)
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            history.replace('/orders')
        })
        
    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error?event.error.message: '')
    }
    return (
        <div className='payment' >
            <h1>Checkout i <Link to='/checkout'>({basket.length} {basket.length > 1 ? 'items' : 'item'})
            </Link> </h1>
           <div className = 'payment__addressForm' > <label>Adress: <input required placeholder = 'Your delivery address' type="text" value = {deliveryAddress} onChange = {e=>setDeliveryAddress(e.target.value)} /></label></div>
            <div className="payment__container">
                <div className="payment__section">
                  
                   
                    <div className="payment__title">
                        <h3>Delivery Adress</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>{ deliveryAddress }</p>
                       
                    </div>
                </div>
                <div className="payment__section">
                <div className="payment__title">
                        <h3>Review items and delievery</h3>
                    </div>
                    <div className="payment__item">
                        {basket.map(item => (<CheckoutProduct
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            image={item.image}
                            price = {item.price}
                        />))}
                    </div> 
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit = {handleSubmit} >
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                rencyFormat
                                renderText={(value) => (
                                    <>
                                    <h3>Order Total: {value} </h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeeded} >{ processing ? <p>Processing</p>: 'Buy now'} </button>
                                {/* <span>{ processing ? <p>Processing</p>: 'Buy now'} </span> */}
                            </div>
                            {error && <div>{ error}</div> }
                       </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
