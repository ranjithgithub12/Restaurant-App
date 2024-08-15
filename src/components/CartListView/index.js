import './index.css'

import CartContext from '../../context/CartContext'
import CartDishes from '../CartDishes'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="unorder-list-items-dish">
          {cartList.map(eachItems => (
            <CartDishes key={eachItems.dishId} cartItemDtails={eachItems} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
