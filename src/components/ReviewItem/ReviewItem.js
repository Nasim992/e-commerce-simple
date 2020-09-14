import React from 'react';
import './ReviewItem.css';
import Cart from '../Cart/Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinusCircle } from '@fortawesome/free-solid-svg-icons'; 
const ReviewItem = (props) => {
    const {name,img,seller,price,stock,key,quantity} = props.products;
      
    const handleRemoveProducts = props.handleRemoveProducts;


    return ( 
       <div className="product-section">
        <div className="image-section">
            <img src={img} alt="product-images"/>
        </div>
        <div className="product-description"> 
        <h4>{name}</h4>
        <h5>Seller: {seller}</h5>
        <h6>price : $ {price}</h6>
        <p>Quantity : {quantity}</p>
        <p>Only {stock} products are available </p>
    
         <button onClick={()=>handleRemoveProducts
            (key)}>
            Remove Product
            <FontAwesomeIcon icon={faMinusCircle} />
         </button>

        </div>
     </div>
    );
};

export default ReviewItem;