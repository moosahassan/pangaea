import React from "react";
import Products from './Products';
import { CartProvider } from "./CartProvider";
import Cart from './Cart';


import './Lumin.scss';

function Lumin() {
    localStorage.clear();

    return ( 
        <CartProvider>
            <Products / >
            <Cart />
        </CartProvider>
    );
}

export default Lumin;