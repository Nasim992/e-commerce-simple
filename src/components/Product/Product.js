import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Product = (props) => {
    const {img,name,price,stock,seller,key} = props.product;
 
    return ( 
        <div className="product-section">
            <div className="image-section">
                <img src={img} alt="product-images"/>
            </div>
            <div className="product-description">
            <h4><Link to={"/product/"+key}>{name}</Link></h4>
            <h5>Seller: {seller}</h5>
            <h6>price : $ {price}</h6>
            <p>Only {stock} products are available </p>
            
            { props.showAddToCart && <button onClick={()=>props.handleAddProducts
                (props.product)}>
                Add cart
                <FontAwesomeIcon icon={faShoppingCart} />
                </button>
             }
            </div>
        </div>
    );
};

export default Product;