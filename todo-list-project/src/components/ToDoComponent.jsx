import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoListComponent from "./TodoListComponent";

const ToDoComponent = () => {
  const inputRef = useRef();
  const [list, setList] = useState("");
  const [todoLists, setTodoLists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddList = () => {
    if (list) {
      setTodoLists([...todoLists, { id: uuid(), name: list }]);
      setList("");
      setError("");
      inputRef.current.focus();
    } else {
      setError("To Do List cannot be empty.");
      inputRef.current.focus();
    }
  };

  const handleEditList = (id, newList) => {
    const updatedToDoList = todoLists.map((list) => {
      if (list.id === id) {
        return { ...list, name: newList };
      }
      return list;
    });
    setTodoLists(updatedToDoList);
  };

  const handleDeleteItem = (removeId) => {
    const filteredList = todoLists.filter((list) => list.id !== removeId);
    setTodoLists(filteredList);
  };

  const handleClearList = () => {
    setTodoLists([]);
  };

  return (
    <div className="todo-list-container">
      <h1>TO DO LIST</h1>
      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter an todo..."
            value={list}
            onChange={(event) => setList(event.target.value)}
          />
          <button onClick={handleAddList} className="btn-add">
            ADD TODO
          </button>
        </div>
        <div>{error ? <p className="error">{error}</p> : null} </div>
      </div>
      <ul className="todo-lists">
        {todoLists.map((list) => (
          <TodoListComponent
            key={list.id}
            list={list}
            handleEditList={handleEditList}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      {todoLists.length > 0 ? (
        <button onClick={handleClearList} className="btn-clear">
          CLEAR LIST{" "}
        </button>
      ) : null}
    </div>
  );
};

export default ToDoComponent;
