import React from "react";
import { useState } from "react";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const editTodo = (id) => {
    //console.log(id);
    setIsEdit(true);
    const searchedTodo = todos.find((item) => item.id === id);
    setTodoText(searchedTodo.text);
  };
  const changeIsDone = (id) => {
    //console.log(id);
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodos = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodos, ...filteredTodos]);
    //console.log(searchedTodo);
    //console.log(updatedTodo);
    //console.log(filteredTodos);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(todoText);
    if (todoText === "") {
      alert("ToDo can't be empty! Please enter your ToDo");
      return;
    }
    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("You already have this in your schedule");
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      isDone: false,
      text: todoText,
      date: new Date(),
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
    //console.log(newTodo);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">ToDo App</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your ToDo"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
      {todos.length <= 0 ? (
        <p className="text-center my-5">You don't have any scheduled ToDo</p>
      ) : (
        <>
          {todos.map((item) => (
            <div
              className={`alert alert-${
                item.isDone === true ? "success" : "secondary"
              } d-flex justify-content-between align-items-center`}
            >
              <p>{item.text}</p>
              <div>
                <button
                  className="btn-sm btn-secondary"
                  onClick={() => changeIsDone(item.id)}
                >
                  {item.isDone === false ? "Done" : "Undone"}
                </button>
                <button
                  className="btn btn-sm btn-success mx-1"
                  onClick={() => editTodo(item.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
