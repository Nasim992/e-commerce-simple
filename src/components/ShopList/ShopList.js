import React from 'react';
import './ShopList.css';
const ShopList = () => {
    return (
        <div>
            <nav className = "shopItem">
                <a href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/inventory">Inventory</a>
            </nav>
        </div>
    ); 
};

export default ShopList;