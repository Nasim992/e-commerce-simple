import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const totalPrice = cart.reduce((total,prd)=>total+(prd.price * prd.quantity ),0);
    let shipping = 0;
    
    if (totalPrice > 30) { 
        shipping = 0;
    } 
    else if(totalPrice>=20 && totalPrice <= 30) {
        shipping = 10 ;
    }
    else if( totalPrice === 0) {
        shipping = 0;
    }
    else if (totalPrice < 20) {
        shipping = 20 ;
    }

    const tax = totalPrice/10;
    const grandTotal = (totalPrice+ shipping+tax);
    const FixedNumbers = num=> {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div className = "cart">
            <h4> Order Summary</h4>
            <p>Items ordered : {cart.length} </p>
            <p>Total Price: {FixedNumbers(totalPrice)}</p>
             <p><small>shipping cost : ${FixedNumbers(shipping)}</small></p>
            <p><small>Tax :$ {FixedNumbers(tax)}</small></p>
            <p>Grand Total :$ {FixedNumbers(grandTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;