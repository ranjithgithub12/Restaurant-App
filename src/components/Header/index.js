import './index.css'
import {IoMdCart} from 'react-icons/io'

const Header = props => {
  const {cartCount} = props
  return (
    <div className="header">
      <h1 className="resturant-name">UNI Resto cafe</h1>
      <div className="order-container">
        <p className="order-content">My Orders</p>
        <IoMdCart size={25} />
        <p>{cartCount}</p>
      </div>
    </div>
  )
}

export default Header
