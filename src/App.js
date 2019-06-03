import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

// function TodoList(props) {
//   const todos = props.todos.map(todo => {

//     return (
//       <li key="{todo.id}">
//         <ul>
//           <li>{todo.id}</li>

//           <li>{todo.content}</li>
//           <li>{todo.color}</li>
//         </ul>
//       </li>
//     );
//   });
//   return (
//     <ul className='todolists'>
//       {todos}
//     </ul>
//   );
// }

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       todos: [
//         {
//           id: 'a',
//           content: 'math',
//           color: 'tomato'
//         },
//         {
//           id: 'b',
//           content: 'lang',
//           color: 'blue'
//         }
//       ]
//     };
//   }

//   render() {
//     return (
//       <div className="App">
//         {/* <header className="App-header">

//         </header> */}

//       </div>
//     );
//   }
//}


const todos = [];

function TodoHeader(props) {
  const remaining = props.todos.filter(todo => {
    return !todo.isDone;
  });
  return (
    <h1>
      <button onClick={props.purge}>Purge</button>
      My Todos
            <span>({remaining.length}/{props.todos.length})</span>
    </h1>
  );
}

function TodoItem(props) {
  return (
    <li>
      <label>
        <input type="checkbox" checked={props.todo.isDone}
          onChange={() => props.checkTodo(props.todo)} />
        <span className={props.todo.isDone ? 'done' : ''}>
          {props.todo.title}
        </span>
      </label>
      <span className="cmd" onClick={() => props.deleteTodo(props.todo)}>[x]</span>
    </li>
  );
}

function TodoList(props) {
  const todos = props.todos.map(todo => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        checkTodo={props.checkTodo}
        deleteTodo={props.deleteTodo}
      />
    );
  });
  return (
    <ul>
      {props.todos.length ? todos : <li>Nothing to do!</li>}
    </ul>
  );
}

function TodoForm(props) {
  return (
    <form onSubmit={props.addTodo}>
      <input type="text" value={props.item} onChange={props.updateItem} />
      <input type="submit" value="Add" />
    </form>
  );
}

function getUniqueId() {
  return new Date().getTime().toString(36) + Math.random().toString(36);
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todos,
      item: ''
    };
    this.checkTodo = this.checkTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.purge = this.purge.bind(this);
  }

  purge() {
    if (!window.confirm('Are you sure?')) {
      return;
    }

    const todos = this.state.todos.filter(todo => {
      return !todo.isDone;
    });

    this.setState({
      todos: todos
    });
  }

  addTodo(e) {
    e.preventDefault();

    if (this.state.item.trim() === '') {
      return;
    }

    const item = {
      id: getUniqueId(),
      title: this.state.item,
      isDone: false
    };

    const todos = this.state.todos.slice();
    todos.push(item);
    this.setState({
      todos: todos,
      item: ''
    });
  }

  deleteTodo(todo) {
    if (!window.confirm('are you sure?')) {
      return;
    }

    const todos = this.state.todos.slice();
    const pos = this.state.todos.indexOf(todo);

    todos.splice(pos, 1);
    this.setState({
      todos: todos
    });
  }

  checkTodo(todo) {
    const todos = this.state.todos.map(todo => {
      return { id: todo.id, title: todo.title, isDone: todo.isDone };
    });

    const pos = this.state.todos.map(todo => {
      return todo.id;
    }).indexOf(todo.id);

    todos[pos].isDone = !todos[pos].isDone;
    this.setState({
      todos: todos
    });
  }

  updateItem(e) {
    this.setState({
      item: e.target.value
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }


  componentDidMount() {
    this.setState({
      todos: JSON.parse(localStorage.getItem('todos')) || []
    });
  }

  render() {
    return (
      <div className="container">
        <TodoHeader
          todos={this.state.todos}
          purge={this.purge}
        />
        <TodoList
          todos={this.state.todos}
          checkTodo={this.checkTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoForm
          item={this.state.item}
          updateItem={this.updateItem}
          addTodo={this.addTodo}
        />
      </div>
    );
  }
}


export default App;
