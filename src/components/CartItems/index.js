import './index.css'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'

const CartItems = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const lengthOfCart = cartList.length
      const onClickRemoveAllItems = () => {
        removeAllCartItems()
      }
      return (
        <div className="cart-page-container">
          <Header cafeName="UNI Resto Cafe" />
          <div className="total-cart-items-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-container">
                <h1 className="my-cart">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-button"
                  onClick={onClickRemoveAllItems}
                >
                  Remove All
                </button>
              </div>
            )}
            <CartListView />
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartItems
