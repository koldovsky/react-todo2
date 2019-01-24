import React from "react";
import "./Todo.css";

class Todo extends React.Component {
  state = {
    todos: [
      { id: 1, text: "learn react", done: true },
      { id: 2, text: "build an react app", done: false },
      { id: 3, text: "modify", done: true },
      { id: 4, text: "test", done: false }
    ],
    text: "",
    filter: ""
  };

  taskList() {
    return this.state.todos
      .filter(task => task.text.search(this.state.filter) !== -1)
      .map(task => {
        if (task.done) {
          return (
            <li key={task.id}>
              <input type="checkbox" defaultChecked="true" onChange={this.undoneClick(task.id)} />
              <s>{task.text}</s>
            </li>
          );
        } else {
          return (
            <li key={task.id}>
              <input type="checkbox" onChange={this.doneClick(task.id)} />
              {task.text}
            </li>
          );
        }
      });
  }

  doneClick = taskId => {
    return () => {
      const task = this.state.todos.filter(task => task.id === taskId)[0];
      const updatedTask = { ...task, done: true };
      this.setState({
        todos: [...this.state.todos.map(task => task.id !== taskId ? task : { ...updatedTask })]
      })
    }
  }

  undoneClick = taskId => {
    return () => {
      const task = this.state.todos.filter(task => task.id === taskId)[0];
      const updatedTask = { ...task, done: false };
      this.setState({
        todos: [...this.state.todos.map(task => task.id !== taskId ? task : { ...updatedTask })]
      })
    }
  }


  remaining() {
    return this.state.todos.reduce((count, task) => {
      return task.done ? count : ++count;
    }, 0);
  }

  addTask = event => {
    event.preventDefault();
    let newTask = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };
    this.setState({
      todos: [...this.state.todos, { ...newTask }],
      text: '',
      filter: this.state.filter
    });
  };

  onChangeInput = event => {
    this.setState({
      todos: this.state.todos,
      filter: this.state.filter,
      text: event.target.value
    });
  };

  onChangeFilter = event => {
    this.setState({
      todos: this.state.todos,
      filter: event.target.value,
      text: this.state.text
    });
  }

  clean = () => {
    this.setState({
      todos: [],
      filter: '',
      text: ''
    });
  }

  render() {
    return (
      <div className="Todo">
        <h2>Todo</h2>
        <div>
          <input type="text" placeholder="filter tasks"
            onChange={this.onChangeFilter} />
          <br />
          <span> {this.remaining()} remaining </span>
        </div>
        <ul>{this.taskList()}</ul>

        <form>
          <input
            type="text"
            onChange={this.onChangeInput}
            value={this.state.text}
          />
          <button type="submit" onClick={this.addTask}>
            Add
          </button>
        </form>

        <a href="#" onClick={this.clean}>clean</a>
      </div>
    );
  }
}

export default Todo;
