import React from 'react'
import './index.css'
import {FaDotCircle} from 'react-icons/fa'

const ListOfDishes = ({
  totalDishes,
  dishQuantity,
  incrementDishCount,
  decrementDishCount,
  addCartItem,
}) => {
  const foodItem = {
    addonCat: totalDishes.addonCat,
    dishId: totalDishes.dish_id,
    dishAvailability: totalDishes.dish_Availability,
    dishType: totalDishes.dish_Type,
    dishCalories: totalDishes.dish_calories,
    dishCurrency: totalDishes.dish_currency,
    dishDescription: totalDishes.dish_description,
    dishImage: totalDishes.dish_image,
    dishName: totalDishes.dish_name,
    dishPrice: totalDishes.dish_price,
    nexturl: totalDishes.nexturl,
  }
  const {
    addonCat,
    dishAvailability,
    dishId,
    dishType,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    nexturl,
  } = foodItem

  const lengthAddOnCat = addonCat.length > 0
  const addToCartButton = dishQuantity >= 1

  const addToCart = () => {
    addCartItem({...foodItem, dishQuantity})
  }

  return (
    <li className="list-of-food-items">
      {dishAvailability ? (
        <FaDotCircle color="green" className="available-symbol" />
      ) : (
        <FaDotCircle color="red" />
      )}
      <div className="food-details-container">
        <h1 className="food-name">{totalDishes.dish_name}</h1>
        <p className="food-currency">{`${totalDishes.dish_currency} ${totalDishes.dish_price}`}</p>
        <p className="food-discription">{dishDescription}</p>
        <p className="calories">{`${dishCalories} calories`}</p>
        {dishAvailability ? (
          <div className="add-food-button-container">
            <button
              className="button"
              onClick={() => decrementDishCount(totalDishes.dish_id)}
            >
              -
            </button>
            <p className="food-count">{dishQuantity}</p>
            <button
              className="button"
              onClick={() => incrementDishCount(totalDishes.dish_id)}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available">Not available</p>
        )}
        {lengthAddOnCat && (
          <p className="add-on-cat">Customizations available</p>
        )}
        {addToCartButton && (
          <button type="button" onClick={addToCart}>
            ADD TO CART
          </button>
        )}
      </div>
      <img className="food-image" src={dishImage} alt={dishName} />
    </li>
  )
}

export default ListOfDishes
