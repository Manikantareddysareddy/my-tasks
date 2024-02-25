import './index.css'

const CreateTask = props => {
  const {task} = props
  const {taskName, tagName} = task
  return (
    <li className="task-list-item">
      <p className="para">{taskName}</p>
      <p className="tag-btn">{tagName}</p>
    </li>
  )
}

export default CreateTask
