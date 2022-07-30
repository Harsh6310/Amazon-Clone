import React from 'react'
import './CartEmpty.css'
function CartEmpty() {
  return (
    <div className='cart-empty'>
        <h1>
            Your Amazon Cart is empty.
        </h1>
        <p>
            Your shopping cart is waiting. Give it purpose - fill it with groceries, clothing, household supplies, electronics, and more.
        </p>
        <p>
            Continue shopping on Amazon. Visit today's deal and your wish list for suggestions.
        </p>
    </div>
  )
}

export default CartEmpty