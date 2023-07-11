import React, { useState } from "react";

const TodoListComponent = ({ list, handleEditList, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newList, setNewList] = useState(list.name);
  const [error, setError] = useState("");

  const onEdit = () => {
    if (newList) {
      handleEditList(list.id, newList);
      setIsEditing(false);
      setError;
    } else {
      setError("To Do List must not be empty");
    }
  };

  return (
    <>
      <li>
        {isEditing ? (
          <input
            type="text"
            value={newList}
            onChange={(event) => setNewList(event.target.value)}
          />
        ) : (
          <span>{list.name}</span>
        )}

        <div>
          <button
            onClick={() => {
              isEditing ? onEdit() : setIsEditing(true);
            }}
            className="btn-edit"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => handleDeleteItem(list.id)}
            className="btn-delete"
          >
            Delete
          </button>
        </div>
      </li>
      {error ? <p className="error"> {error}</p> : null}
    </>
  );
};

export default TodoListComponent;
