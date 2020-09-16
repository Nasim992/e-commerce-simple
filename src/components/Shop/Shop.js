import React, { useState, useEffect } from 'react';
import fakeData  from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import  {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
const Shop = () => {
    //   const first10 = fakeData.slice(0,10);
      const all = fakeData;
      const [products,setProducts] = useState(all);
      const [cart,setCart] = useState([]);

      useEffect(()=>{

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(pdKey=> {
        const product = fakeData.find(pd=>pd.key ===pdKey);
        product.quantity = savedCart[pdKey];
        return product;
        })
        setCart(previousCart);
      },[])
       
   
      const handleAddProducts = (product)=> {
        const tobeAddedKey = product.key;
        const sameProduct = cart.find(pd=> pd.key === tobeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=> pd.key !== tobeAddedKey);
            newCart = [...others,sameProduct];
        }
        else  {
            product.quantity = 1;
            newCart = [...cart,product];
        }
          setCart(newCart);
       
         
          addToDatabaseCart(product.key,count);
      }
    return ( 
        <div className="shop-container">
            <div className="product-container">
            <ul>
                {
                    products.map(singleProduct=>
                    <Product showAddToCart = {true} product={singleProduct} handleAddProducts={handleAddProducts} key={singleProduct.key}>

                    </Product>)
                }
            </ul>
            </div>
            <div>
                <Cart cart={cart}>
                <Link to="/review"><button>Review Order</button></Link>
                </Cart>
            </div>
      
        </div>
    );
};

export default Shop;