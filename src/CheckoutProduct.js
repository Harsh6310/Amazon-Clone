import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,image,title,price,rating,hideButton}) {
    const [{basket},dispatch] = useStateValue() ;
    const removeFromBasket = () => {
        dispatch({
            type: 'remove-from-basket',
            id: id
        })
    }

    const putStars = (rating) => {
        const a = Array(5).fill().map((_,i) => (<p className='stars'>☆</p>)) ;
        a.fill(<p className='stars'>★</p>,0,rating-1) ;
        return a ;
    }

    return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct-img' src={image}/>
        <div className='checkoutProduct-info'>
            <p className='checkoutProduct-title'>
                {title}
            </p>
            <div className='checkoutProduct-rating'>
                {putStars(rating)}
            </div>
            <p className='checkoutProduct-price'>
                <small>
                    ₹
                </small>
                <strong>
                    {price.toLocaleString('en-IN')}
                </strong>
            </p>
            {(!hideButton && (<button onClick={removeFromBasket}>
                Remove from Cart
            </button>))}
            
        </div>
    </div>
    
  )
}

export default CheckoutProduct