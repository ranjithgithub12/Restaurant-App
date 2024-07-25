import './index.css'
import {IoMdCart} from 'react-icons/io'

const Header = props => {
  const {cartCount, cafeName} = props
  console.log(cafeName)

  return (
    <div className="header">
      <h1 className="resturant-name">{cafeName}</h1>
      <div className="order-container">
        <p className="order-content">My Orders</p>
        <IoMdCart size={25} />
        <p>{cartCount}</p>
      </div>
    </div>
  )
}

export default Header
