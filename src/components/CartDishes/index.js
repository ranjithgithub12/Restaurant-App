import CartContext from '../../context/CartContext'
import './index.css'

const CartDishes = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDtails} = props

      const {
        dishImage,
        dishId,
        dishName,
        dishPrice,
        dishQuantity,
      } = cartItemDtails

      const totalPrice = dishPrice * dishQuantity

      const onClickDecrement = () => {
        decrementCartItemQuantity(dishId)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(dishId)
      }
      const onClickRemoveOneCartItem = () => {
        removeCartItem(dishId)
      }
      return (
        <li className="list-of-dishes">
          <div>
            <img className="cart-image" src={dishImage} />
            <h1 className="dish-heading-cart">{dishName}</h1>
          </div>
          <div className="cart-increment-decrement">
            <button
              className="cart-incre-decre-button"
              onClick={onClickDecrement}
            >
              -
            </button>
            <p>{dishQuantity}</p>
            <button
              className="cart-incre-decre-button"
              onClick={onClickIncrement}
            >
              +
            </button>
          </div>
          <div>
            <p className="dish-price-cart">{totalPrice}</p>
          </div>
          <button onClick={onClickRemoveOneCartItem}>Remove</button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartDishes
