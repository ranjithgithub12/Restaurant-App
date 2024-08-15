import React from 'react'

const CartContext = React.createContext({
  nameOfResturant: '',
  setNameOfResturant: () => {},
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
