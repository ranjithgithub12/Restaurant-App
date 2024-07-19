import {Component} from 'react'
import Header from '../Header'
import './index.css'
import ListOfCategory from '../ListOfCategory'
import ListOfDishes from '../ListOfDishes'

class Dishs extends Component {
  state = {
    listOfItem: [],
    listOfCategory: [],
    isActiveId: null,
    cartCount: 0,
    dishCounts: {}, // Track counts for each dish
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl)
    const data = await response.json()
    const formatingData = data.map(eachItem => ({
      branchName: eachItem.branch_name,
      nexturl: eachItem.nexturl,
      restaurantId: eachItem.restaurant_id,
      restaurantImage: eachItem.restaurant_image,
      restaurantName: eachItem.restaurant_name,
      tableId: eachItem.table_id,
      tableMenuList: eachItem.table_menu_list,
      tableName: eachItem.table_name,
    }))

    const formatingCategory = formatingData[0].tableMenuList.map(eachItem => ({
      categoryDishes: eachItem.category_dishes,
      menuCategory: eachItem.menu_category,
      menuCategoryId: eachItem.menu_category_id,
      menuCategoryImage: eachItem.menu_category_image,
      nexturl: eachItem.nexturl,
    }))

    this.setState({
      listOfItem: formatingData,
      listOfCategory: formatingCategory,
      isActiveId: formatingCategory[0].menuCategoryId,
    })
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
      dishCounts: {
        ...prevState.dishCounts,
        [dishId]: (prevState.dishCounts[dishId] || 0) + 1,
      },
      cartCount: prevState.cartCount + 1,
    }))
  }

  decrementDishCount = dishId => {
    this.setState(prevState => {
      if ((prevState.dishCounts[dishId] || 0) > 0) {
        return {
          dishCounts: {
            ...prevState.dishCounts,
            [dishId]: (prevState.dishCounts[dishId] || 0) - 1,
          },
          cartCount: prevState.cartCount - 1,
        }
      }
      return null
    })
  }

  render() {
    const {listOfCategory, isActiveId, cartCount, dishCounts} = this.state
    const filterTabId = this.getFilterTabId()

    return (
      <div className="resturant-app">
        <Header cartCount={cartCount} />
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
              dishCount={dishCounts[eachItem.dish_id] || 0}
              incrementDishCount={this.incrementDishCount}
              decrementDishCount={this.decrementDishCount}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Dishs
