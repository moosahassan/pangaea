import React, { useEffect, useState, useContext } from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { gql, useQuery } from '@apollo/client';
// import storedData from '../data';

import { CartContext } from "./CartProvider";
import {ALL_CURRENCY} from '../index';

import './Cart.scss';

function Cart (props) {
    const {showCart, setShowCart, state, setState} = useContext(CartContext)
    const [cartClasses, setCartClasses] = useState('side-drawer');
    const [selectedCurrency, setCurrency] = useState('USD');
    const { loading, errors, data } = useQuery(ALL_CURRENCY);
    
    if (loading) return <p>Loading...</p>;
    if (errors) return <p>Error</p>;

    const handleAdd = (product) => {
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

    const handleRemove = (product) => {
        const productId = product.id;
        setState(oldValues => {
        const productIndex = oldValues.findIndex(
            val => val.productId === productId
        )
        
        let updatedCartItems = [];
        
        // If the product already exists in cart, then update the quantity
        if (productIndex !== -1) {
            const qty = oldValues[productIndex].qty;
            const newQty = qty - 1;
            if (newQty > 0) {
            updatedCartItems = oldValues.map(val => {
                    if(val.productId === productId) {
                      return {...val, qty: newQty};
                    }
                    return {...val};
                  });
            } else {
                updatedCartItems = oldValues.filter(val => {
                    return val.productId !== productId;
                })
            }
        } else {
            //Otherwise add the item to the end of the array
            // updatedCartItems = [...oldValues, { productId, qty: 1, product }]
        }
        return updatedCartItems
        });
    }    
    const cartItems = state.map((item, index) => (
        <div key={item.productId} className="item-list">
            <Card.Text >
                <div className="item-product">
                    {`${item.product.title}: ${selectedCurrency} ${item.product.price}`}
                </div>
            </Card.Text>
            <Card.Text >
            <div className="qty-control" >
               <span className="btn-control"onClick={() => handleRemove(item.product)}>-</span>
                <span className="btn-control">{item.qty}</span>
                <span className="btn-control" onClick={ () => handleAdd(item.product)}>+</span>
            </div>
            </Card.Text>
        </div>

      ));

    const cartTotal = arr => arr.reduce((sum, item) => {
        return sum + item.qty * item.product.price;
    }, 0)
    
    const handleClose = () => {
        setShowCart('side-drawer');
        // setCartClasses('side-drawer');
    };

    const modifyCurrency = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div className={showCart}>
            <CloseButton onClick={handleClose} className="close-button" />
            <center><h2 >Cart</h2></center>
            <hr/>
            <Form.Select onChange={e => modifyCurrency(e)} className="currency-select">
                <option >{selectedCurrency}</option>
                {!loading && data.currency.map(currency => <option key={currency} value={currency}>{currency}</option>)}
            </Form.Select>            
            <Card.Text className="total-amount">
                Total: {selectedCurrency} {cartTotal(state)}
            </Card.Text>
            <h3>{cartItems}</h3>
        </div>
    );
}

export default Cart;
