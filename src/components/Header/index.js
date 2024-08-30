import './index.css'
import {IoMdCart} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

const Header = props => {
  const {cartCount, cafeName} = props
  console.log(cafeName)

  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, nameOfResturant} = value
        const lengthOfCart = cartList.length
        return (
          <div className="header">
            <Link to="/" className="link-menu">
              <h1 className="resturant-name">{nameOfResturant}</h1>
            </Link>
            <div className="order-container">
              <Link to="/cart" className="link-menu">
                <button type="button" data-testid="cart" className="link-menu">
                  <p className="order-content">My Orders</p>
                  <IoMdCart size={25} />
                  <p>{lengthOfCart}</p>
                </button>
              </Link>
              <button className="logout-button" onClick={onClickLogoutButton}>
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
