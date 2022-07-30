import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format'
import axios from './axios'
import { db } from './firebase'

function Payment() {
    const [{ basket,user }, dispatch] = useStateValue() ;

    const stripe = useStripe() ;
    const elements = useElements() ;

    const navigate = useNavigate() ;

    const [succeeded, setSucceeded] = useState(false) ;
    const [processing, setProcessing] = useState("") ;
    const [error,setError] = useState(null) ;
    const [disabled, setDisabled] = useState(true) ;
    const [clientSecret, setClientSecret] = useState(true) ;
    
    // const url = '/payments/create?total=' + getBasketTotal(basket)*100 ;
    // alert(url) ;

    useEffect(
        () => {
            //generate stripe secret which allows us to charge a customer
            const getClientSecret = async () => {
                const response = await axios({
                    method: 'post',
                    url : '/payments/create?total=' + getBasketTotal(basket)*100
                }) ;
                setClientSecret(response.data.clientSecret)
            }

            getClientSecret() ;
        }, [basket]
    )

    console.log('the secret is ', clientSecret) ;
        
    const handleSubmit = async (event) => {
        event.preventDefault() ;
        setProcessing(true) ;

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) 
            }
        }).then(({ paymentIntent }) => {
            
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket ,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true) ;
            setError(null) ;
            setProcessing(false) ;
            
            dispatch({
                type: 'empty-basket'
            })

            navigate('/orders', { replace: true })
        })
    }

    const handleChange = event => {
        setDisabled(event.empty) ;
        setError(event.error ? event.error.message : "") ;
    }

  return ( 
    <div className='payment'>
        <div className='payment-container'>
            <h1>
                Checkout (
                    <Link to='../checkout'>
                        {basket?.length} items
                    </Link>
                )
            </h1>
        </div>
        <div className='payment-section'>
            <div className='payment-info-block'>
                <h4>
                    Shipping Address <a href=''>Change</a>
                </h4>
                <p>{user?.email}</p>
                <p>123 C, Habitat Apartments</p>
                <p>Indirapuram, Ghaziabad</p>
                <p>Uttar Pradesh, 201014</p>
                <p> India</p>
                <a href=''>Add delivery options</a>
            </div>
            <div className='payment-info-block'>
                <h4>
                    Gift cards, Vouchers & Promotional Codes
                </h4>
                
                <input type='text' />
                <button>Apply</button>
            </div>
        </div>

        <div className='payment-section'>
            <div className='payment-title'>
                Review Items and Delivery
            </div>
            <div className='payment-items'>
                {basket.map(item => (
                    <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))
                }
            </div>
        </div>

        <div className='payment-section'>
            <div className='payment-title'>
                Payment Method
            </div>
            <div className='payment-details'>
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />
                    <div className='payment-priceContainer'>
                        <CurrencyFormat
                            renderText={(value) => (
                                <h3>
                                    Order Total: {value}
                                </h3>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            thousandSpacing='2s'
                            prefix={"₹"}
                        />
                        <button disabled={processing || disabled || succeeded} className='buy-button'>
                            <span>
                                {processing ? <p>Processing</p> : "Buy Now"}
                            </span>
                        </button>
                    </div>
                    {error && <div>
                        {error}
                    </div>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Payment ;