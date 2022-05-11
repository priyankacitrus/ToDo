import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  var newArr=[];
  const setRemove = (item) => {
    newArr=[...todos].filter(todo=>todo!==item);
    setTodos(newArr);
  }
  return (
    <div>
      <AddTodo makeTodos={(text) => setTodos([...todos, text])} />
      {todos.map((todo, index) => {
        return <Todo todoNo={index} todo={todo} key={index} setRemove={setRemove} />;
      })}
    </div>
  );
}

export default App;