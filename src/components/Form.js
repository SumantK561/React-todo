import React, { useState, useEffect } from "react";

import { Icon } from "react-icons-kit";

import { plus } from "react-icons-kit/feather/plus";
import { edit2 } from "react-icons-kit/feather/edit2";
import { trash } from "react-icons-kit/feather/trash";

const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Form = () => {
  // todo value state
  const [todoValue, setTodoValue] = useState("");

  // todos array of objects
  const [todos, setTodos] = useState(getTodosFromLS());

  const handleSubmit = (e) => {
    e.preventDefault();

    {
      let inpVal = document.getElementById("inp");
      if (inpVal.value.trim() === "") {
        alert("Blank Spaces Not Allowed");
        inpVal.value = "";
        inpVal.focus();

        return false;
      }
    }
    // eslint-disable-next-line
    {
      document.getElementById("empty").style.display = "none";
    }
    const date = new Date();
    const time = date.getTime();

    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };

    setTodos([...todos, todoObject]);
    setTodoValue("");
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };

  const [editForm, setEditForm] = useState(false);

  const [id, setId] = useState();

  const deletall = () =>{
    setTodos([])
      // eslint-disable-next-line
      window.location.reload();
  }

  const handleEdit = (todo, index) => {
    setEditForm(true);
    setTodoValue(todo.TodoValue);
    setId(index);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    let items = [...todos];

    let item = items[id];
    if (todoValue.trim() !== "") {
      item.TodoValue = todoValue;
      item.completed = false;
      items[id] = item;
    } else {
      alert("Blank Spaces Not Allowed");
      return false;
    }
    setTodos(items);
    setEditForm(false);
    setTodoValue("");
  };
  
 

  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        } else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);

      setTodos(todoArray);
    });
  };

  return (
    <>
      {editForm === false && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                placeholder="Add an Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                id="inp"
                value={todoValue}
              />
              <div className="button">
                <button type="submit">
                  <Icon icon={plus} size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {editForm === true && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleEditSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                placeholder="Edit your Item"
                required
                onChange={(e) => setTodoValue(e.target.value)}
                id="inp1"
                value={todoValue}
              />
              <div className="button edit">
                <button type="submit">UPDATE</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {todos.length > 0 && (
        <>
          {todos.map((individualTodo, index) => (
            <div className="todo" key={individualTodo.ID}>
              <div>
                {editForm === false && (
                  <input
                    type="checkbox"
                    checked={individualTodo.completed}
                    onChange={() => handleCheckbox(individualTodo.ID)}
                  />
                )}
                <span
                  style={
                    individualTodo.completed === true
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {individualTodo.TodoValue}
                </span>
              </div>

              {editForm === false && (
                <div className="edit-and-delete">
                  <div
                    style={{ marginRight: 7 + "px" }}
                    onClick={() => handleEdit(individualTodo, index)}
                  >
                    <Icon icon={edit2} size={18} />
                  </div>
                  <div onClick={() => handleDelete(individualTodo.ID)}>
                    <Icon icon={trash} size={18} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {editForm === false && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button  className="delete-all" onClick={deletall}>
                Delete All Items
              </button>
            </div>
           
          )}
        </>
      )}
    </>
  );
};
