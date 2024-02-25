import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CreateTask from './components/CreateTask'

import TagItem from './components/TagItem'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const OptionItem = props => {
  const {tagItem} = props
  const {optionId, displayText} = tagItem
  return <option value={optionId}>{displayText}</option>
}

class App extends Component {
  state = {
    tagItemList: tagsList,
    activeTag: '',
    activeTags: tagsList[0].displayText,
    userInput: '',
    taskList: [],
    newTasksList: [],
  }

  getTasks = data => {
    const {activeTag, taskList} = this.state

    if (data === activeTag) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: data})
    }
  }

  submitTask = event => {
    event.preventDefault()
    const {activeTags, userInput} = this.state
    const newTask = {
      id: uuidv4(),
      taskName: userInput,
      tagName: activeTags,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      userInput: '',
      activeTags: tagsList[0].displayText,
    }))
  }

  onTypeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeTag = event => {
    const {tagItemList} = this.state
    const value = tagItemList.filter(
      each => each.optionId === event.target.value,
    )

    this.setState({activeTags: value[0].displayText})
  }

  getFilteredTasks = () => {
    const {activeTag, taskList} = this.state
    const filteredApps = taskList.filter(
      eachItem => eachItem.tagName === activeTag,
    )
    return filteredApps
  }

  render() {
    const {
      tagItemList,
      activeTags,
      activeTag,
      userInput,
      taskList,
      newTasksList,
    } = this.state

    let filteredApps = this.getFilteredTasks()

    if (filteredApps.length === 0) {
      filteredApps = taskList
    }

    return (
      <div className="bg-container">
        <div className="taskContainer">
          <h1 className="main-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.submitTask}>
            <div className="input-container">
              <label htmlFor="task" className="labelEl">
                Task
              </label>
              <input
                id="task"
                placeholder="Enter the task here"
                value={userInput}
                className="inputEl"
                onChange={this.onTypeInput}
              />
            </div>
            <div className="input-container">
              <label htmlFor="tag" className="labelEl">
                Tags
              </label>
              <select id="tag" className="inputEl" onChange={this.onChangeTag}>
                {tagItemList.map(eachItem => (
                  <OptionItem tagItem={eachItem} key={eachItem.optionId} />
                ))}
              </select>
            </div>
            <button type="submit" className="submit-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="second-container">
          <div>
            <h1 className="heading">Tags</h1>
            <ul className="ul-container">
              {tagItemList.map(eachTag => (
                <TagItem
                  Item={eachTag}
                  key={eachTag.optionId}
                  getTasks={this.getTasks}
                  isActive={activeTag === eachTag.displayText}
                />
              ))}
            </ul>
          </div>
          <div className="task-container">
            <h1 className="new-heading">Tasks</h1>
            {taskList.length === 0 ? (
              <p className="task-heading">No Tasks Added Yet</p>
            ) : (
              <ul className="task-ul-container">
                {filteredApps.map(eachTask => (
                  <CreateTask task={eachTask} key={eachTask.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
