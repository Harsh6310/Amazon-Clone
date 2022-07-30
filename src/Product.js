import React from 'react'
import './product.css' ;
import { useStateValue } from './StateProvider' ;



function Product({id,title,image,price,rating}) {
    const [{basket}, dispatch] = useStateValue() ; 

    const addToBasket = () => {
        dispatch({
            type: 'add-to-basket',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        }) ;
        // console.log(basket) ;
    };

    const putStars = (rating) => {
        const a = Array(5).fill().map((_,i) => (<p className='stars'>☆</p>)) ;
        a.fill(<p className='stars'>★</p>,0,rating-1) ;
        return a ;
    }

  return (
    <div className='product'>
        <div className='product-info'>
            <p className='product-desc'> {title} </p>
            <p className='product-price'>
                <small>₹</small>
                <strong className='ppa'>{price.toLocaleString('en-IN')} </strong>
            </p>
            <div className='product-rating'>
            {putStars(rating)}
            </div>
        </div>
        <img src={image} />
        <button onClick={addToBasket}>
            Add to Cart
        </button>
    </div>
  )
}

export default Product