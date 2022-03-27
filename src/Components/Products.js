import React, { useContext, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { CartContext } from "./CartProvider";

import './Products.scss';
import storedData from '../data';
import {ALL_PRODUCTS} from '../index';

function Products() {
    // const { loading, errors, data } = useQuery(ALL_PRODUCTS);
    const {showCart, setShowCart, state, setState} = useContext(CartContext);
    
    let products =  storedData.data.products;

    const addToCart = (product) => {
      setShowCart('side-drawer open');      
      const productId = product.id;
      setState(oldValues => {
        const productIndex = oldValues.findIndex(
          val => val.productId === productId
        )
  
        let updatedCartItems = []
  
        // If the product already exists in cart, then update the quantity
        if (productIndex !== -1) {
          updatedCartItems = [
            ...oldValues.slice(0, productIndex),
            {
              productId,
              qty: oldValues[productIndex].qty + 1,
              product,
            },
            ...oldValues.slice(productIndex + 1),
          ]
        } else {
          //Otherwise add the item to the end of the array
          updatedCartItems = [...oldValues, { productId, qty: 1, product }]
        }
  
        return updatedCartItems
      });
    }
    return (
      <div className="container">
        <div className="row">
          {
            products.map(product => {
              return (
                <div key={product.id} className="product medium-screen small-screen">
                  <center>
                    <img  src={product.image_url} className={"img"}/>
                    <p className="title">{product.title}</p>
                    <p className="price">From {product.id}</p>
                    <button type="button" className="btn btn-secondary" onClick={()=>addToCart(product)}>Add to Cart</button>
                  </center>
                </div>);
            })
          }
        </div>
      </div>
    );
}

export default Products;
