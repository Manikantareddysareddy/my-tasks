import './index.css'

const TagItem = props => {
  const {Item, getTasks, isActive} = props
  const {displayText} = Item
  const ActiveClassName = isActive === true ? 'ActiveBtnEl' : null
  const onGetTag = () => {
    getTasks(displayText)
  }
  return (
    <li className="list-item">
      <button
        type="button"
        className={`buttonEl ${ActiveClassName}`}
        onClick={onGetTag}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
