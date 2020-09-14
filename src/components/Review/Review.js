import React, { useState, useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/databaseManager';
import '../../fakeData';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css';

const Review = () => {
    const [cart,setCart] = useState([]);
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
    const cartLength = cart.length;
      return (
             <> 
             <div className="shop-container"> 
        
                 <div className="product-container">
                 {
                 cartLength===0 && <div className="didntBuy">
                     <h1>You didn't buy any product</h1>
                 </div>
                 } 
                 {
                     
                     cart.map(pd=><ReviewItem handleRemoveProducts={handleRemoveProducts} products={pd}></ReviewItem>)
                 }
             </div>
             <div>
                 <Cart cart={cart}></Cart>
             </div>
               </div>
          </>
    );
};

export default Review;