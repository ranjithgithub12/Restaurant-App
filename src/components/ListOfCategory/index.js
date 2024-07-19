import './index.css'

const ListOfCategory = props => {
  const {eachItem, categorySelectItem, isActive} = props

  const {menuCategory, menuCategoryId} = eachItem

  const onClickCategory = () => {
    categorySelectItem(menuCategoryId)
  }
  const buttonColor = isActive ? 'button-new' : ''
  return (
    <li className="list-of-items">
      <button
        className={`category-items ${buttonColor}`}
        onClick={onClickCategory}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default ListOfCategory
