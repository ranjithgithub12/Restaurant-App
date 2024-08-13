import './index.css'
import {IoMdCart} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {cartCount, cafeName} = props
  console.log(cafeName)

  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header">
      <Link to="/" className="link-menu">
        <h1 className="resturant-name">{cafeName}</h1>
      </Link>
      <div className="order-container">
        <Link to="/cart" className="link-menu">
          <p className="order-content">My Orders</p>
          <IoMdCart size={25} />
          <p>{cartCount}</p>
        </Link>
        <button className="logout-button" onClick={onClickLogoutButton}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
