import React, { createContext, useState } from 'react';
import Shop from '../Shop/Shop';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Review from '../Review/Review';
import Inventory from '../Inventory/Inventory';
import NotFound from '../NotFound/NotFound';
import ProductDetail from '../ProductDetail/ProductDetail';
import Login from '../Login/Login';
import Shipment from '../Shipment/Shipment';

export const UserContext = createContext();


const Home = () => {

    const [loggedInUser,setLoggedInUser] = useState({});


    return (
        <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
            <h3>email : {loggedInUser.email}</h3>
            {/* <Shop></Shop> */}
            <Router>
                <Switch>
                    <Route path='/shop'>
                                <Shop></Shop>
                    </Route>
                    <Route path="/review">
                                <Review></Review>
                    </Route>
                    <Route path="/inventory">
                            <Inventory></Inventory>
                    </Route>
                    <Route path="/login">
                            <Login></Login>
                    </Route>
                    <Route path="/shipment">
                           <Shipment></Shipment>
                    </Route>

                    <Route exact  path="/">
                             <Shop></Shop>
                    </Route>
                    <Route path="/product/:productKey">
                            <ProductDetail></ProductDetail>
                    </Route>
                    <Route path="*">
                            <NotFound></NotFound>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
};

export default Home;