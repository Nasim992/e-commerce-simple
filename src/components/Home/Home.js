import React from 'react';
import Shop from '../Shop/Shop';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Review from '../Review/Review';
import Inventory from '../Inventory/Inventory';
import NotFound from '../NotFound/NotFound';
import ProductDetail from '../ProductDetail/ProductDetail';
const Home = () => {
    return (
        <div>
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
        </div>
    );
};

export default Home;