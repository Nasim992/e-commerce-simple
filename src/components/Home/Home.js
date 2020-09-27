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
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ShopList from '../ShopList/ShopList';

export const UserContext = createContext();


const Home = () => {

    const [loggedInUser,setLoggedInUser] = useState({});


    return (
        <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
            <h3>email : {loggedInUser.email}</h3>
            {/* <Shop></Shop> */}
            <Router>
            <ShopList></ShopList>
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
                    <PrivateRoute path="/shipment">
                           <Shipment></Shipment>
                    </PrivateRoute>

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