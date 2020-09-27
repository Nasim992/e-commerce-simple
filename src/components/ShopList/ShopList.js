import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Home/Home';
import './ShopList.css';
const ShopList = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext); 
    return (
        <div>
            <nav className = "shopItem">
                <Link to ="/shop">Shop</Link>
                <Link  to ="/review">Review</Link>
                <Link  to ="/inventory">Inventory</Link>
                <button onClick={()=> setLoggedInUser({})}>Sign Out</button>
            </nav> 
        </div>
    ); 
};

export default ShopList;