import React, { useState } from "react"

const CartContext = React.createContext([[], () => {}])

let initialState = []

const CartProvider = props => {

  const [state, setState] = useState(initialState);
  const [showCart, setShowCart] = useState('side-drawer');

  return (
    <CartContext.Provider value={{state, setState, showCart, setShowCart}}>
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
