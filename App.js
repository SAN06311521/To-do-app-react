import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import header from './Component/layouts/header';
import { Todo } from "./Component/AddTodos";
import './App.css';
import { about } from "./Component/public/about";
import uuid from 'uuid';
import axios from 'axios';

class App extends Comment {
  state = {
    todos : []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res => this.setState({ todos: res.data}));
  }

  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.comleted = !todo.comleted;
        }
        return todo;
      })
    });;
  };


addTodo = title => {
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => {
      res.data.id = uuid.v4();
      this.setState({ todos: [...this.state.todos, res.data] });
    });
};

render() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route
            exact
            path="/"
            render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path="/about" component={About} />
        </div>
      </div>
    </Router>
  );
}
}


export default App;
