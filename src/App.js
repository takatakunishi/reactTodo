import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

function TodoList(props) {
  const todos = props.todos.map(todo => {
    console.log(todo.id);
    return (
      <li key="{todo.id}">
        <ul>
          <li>{todo.id}</li>
          <li>{todo.content}</li>
          <li>{todo.color}</li>
        </ul>
      </li>
    );
  });
  return (
    <ul>
      {todos}
    </ul>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          id: 'a',
          content: 'math',
          color: 'tomato'
        },
        {
          id: 'b',
          content: 'lang',
          color: 'blue'
        }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TodoList
            todos={this.state.todos}
          />
          <p>Hello React!</p>
        </header>
      </div>
    );
  }
}

export default App;
