import React, { useState, useEffect } from 'react';
import {getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import '../../fakeData';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([]);

    const [orderplaced,setOrderPlaced] = useState([]);

    const history = useHistory();
     

    const handleProceedCheckout = ()=> {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
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
                  <button onClick={handleProceedCheckout}>Proceed CheckOut</button>
                 </Cart>
              }
             
             </div>
               </div>
          </>
    );
};

export default Review;