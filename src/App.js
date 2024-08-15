import './App.css'
import {Component} from 'react'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Dishs from './components/Dishs'
import LoginForm from './components/LoginForm'
import CartItems from './components/CartItems'

import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dishes => {
    const {cartList} = this.state
    const dishObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dishes.dishId,
    )

    if (dishObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (dishObject.dishId === eachCartItem.dishId) {
            const updatedQuantity =
              eachCartItem.dishQuantity + dishes.dishQuantity

            return {...eachCartItem, dishQuantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, dishes]
      this.setState({cartList: updatedCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (dishId === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.dishQuantity + 1
          return {...eachCartItem, dishQuantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const dishObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dishId,
    )

    if (dishObject.dishQuantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.dishQuantity - 1
            return {...eachCartItem, dishQuantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishId !== dishId,
    )
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Dishs} />
            <ProtectedRoute exact path="/cart" component={CartItems} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
