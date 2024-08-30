import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import ListOfCategory from '../ListOfCategory'
import ListOfDishes from '../ListOfDishes'

import CartContext from '../../context/CartContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Dishs extends Component {
  state = {
    listOfItem: [],
    listOfCategory: [],
    nameOfResturant: '',
    isActiveId: null,
    cartCount: 0,
    apiStatus: apiStatusConstants.initial,
    dishQuantity: {}, // Track counts for each dish
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl)
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      branchName: eachItem.branch_name,
      nexturl: eachItem.nexturl,
      restaurantId: eachItem.restaurant_id,
      restaurantImage: eachItem.restaurant_image,
      restaurantName: eachItem.restaurant_name,
      tableId: eachItem.table_id,
      tableMenuList: eachItem.table_menu_list,
      tableName: eachItem.table_name,
    }))

    const storeName = formattedData[0].restaurantName

    const formattedCategory = formattedData[0].tableMenuList.map(eachItem => ({
      categoryDishes: eachItem.category_dishes,
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      menuCategoryImage: eachItem.menu_category_image,
      nexturl: eachItem.nexturl,
    }))

    this.setState({
      listOfItem: formattedData,
      listOfCategory: formattedCategory,
      isActiveId: formattedCategory[0].menuCategoryId,
      nameOfResturant: storeName,
      apiStatus: apiStatusConstants.success,
    })

    // Update the context with the restaurant name using destructuring
    const {setNameOfResturant} = this.context
    setNameOfResturant(storeName)
  }

  selectedItem = tabId => {
    this.setState({isActiveId: tabId})
  }

  getFilterTabId = () => {
    const {isActiveId, listOfCategory} = this.state
    const filterId = listOfCategory.find(
      eachItem => eachItem.menuCategoryId === isActiveId,
    )
    return filterId ? filterId.categoryDishes : []
  }

  incrementDishCount = dishId => {
    this.setState(prevState => ({
      dishQuantity: {
        ...prevState.dishQuantity,
        [dishId]: (prevState.dishQuantity[dishId] || 0) + 1,
      },
      cartCount: prevState.cartCount + 1,
    }))
  }

  decrementDishCount = dishId => {
    this.setState(prevState => {
      if ((prevState.dishQuantity[dishId] || 0) > 0) {
        return {
          dishQuantity: {
            ...prevState.dishQuantity,
            [dishId]: (prevState.dishQuantity[dishId] || 0) - 1,
          },
          cartCount: prevState.cartCount - 1,
        }
      }
      return null
    })
  }

  renderSuccessView = () => {
    const {
      listOfCategory,
      isActiveId,
      cartCount,
      dishQuantity,
      nameOfResturant,
    } = this.state
    const filterTabId = this.getFilterTabId()

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value
          return (
            <div>
              <Header cafeName={nameOfResturant} cartCount={cartCount} />
              <ul className="unorder-list-items">
                {listOfCategory.map(eachItem => (
                  <ListOfCategory
                    eachItem={eachItem}
                    key={eachItem.menuCategoryId}
                    isActive={isActiveId === eachItem.menuCategoryId}
                    categorySelectItem={this.selectedItem}
                  />
                ))}
              </ul>
              <ul className="unorder-food-items">
                {filterTabId.map(eachItem => (
                  <ListOfDishes
                    totalDishes={eachItem}
                    key={eachItem.dish_id}
                    dishQuantity={dishQuantity[eachItem.dish_id] || 0}
                    incrementDishCount={this.incrementDishCount}
                    decrementDishCount={this.decrementDishCount}
                    addCartItem={addCartItem}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderLoaderView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaruantDishes = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div className="resturant-app">{this.renderRestaruantDishes()}</div>
  }
}

Dishs.contextType = CartContext

export default Dishs
