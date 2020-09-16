import React, { useState, useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import '../../fakeData';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart,setCart] = useState([]);

    const [orderplaced,setOrderPlaced] = useState([]);

    const handlePlaceOrder = ()=> {
        console.log("Order Placed");
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const handleRemoveProducts = ((key)=> {
        const newCart = cart.filter(pd=>pd.key!==key);
        setCart(newCart);
        removeFromDatabaseCart(key);
    });
    useEffect(()=> {
      
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
 
        const cartProducts = productKeys.map(key=>{
            const product  = fakeData.find(pd=>pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);  
    },[])  
    let cartLength = cart.length;
    let  thankyou;
     if(orderplaced ===true) {
         thankyou = <img src={happyImage} alt="happyImage"/>;
         cartLength = 1;
     }
      return (
             <> 
  
                   {
                    cartLength===0 && <div className="didntBuy">
                        <h1>You didn't buy any product</h1>
                    </div>
                    } 
                
                <div className="shop-container"> 
                 <div className="product-container">
                 {
                     
                     cart.map(pd=><ReviewItem handleRemoveProducts={handleRemoveProducts} products={pd}></ReviewItem>)
                 }
                     {thankyou}
             </div>
             <div>
             
              {
                  cartLength &&    <Cart cart={cart}>
                  <button onClick={handlePlaceOrder}>Place Order</button>
                 </Cart>
              }
             
             </div>
               </div>
          </>
    );
};

export default Review;