import React, { useState } from "react";
import "./Card.css";
import Modal from "../Modal/Backdrop";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../Services/TodoApi";
const Card = ({ todos, id }) => {
  const [editModal, setEditModal] = useState(false);

  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });

  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const titleUpdateHandler = (e) => {
    setTodo({ title: e.target.value, body: todo.title });
  };

  const todoUpdateHandler = (e) => {
    setTodo({ title: todo.title, body: e.target.value });
  };

  const UpdateTodoHandler = () => {

    updateTodo({ id, ...todo })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditModal(false);
  };

  const DeleteTodoHandler = () => {
    
    deleteTodo({id})
      .unwrap()
      .then((data) => {
        console.log("Todo deleted");
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div className="card_container">
      <p>{todos}</p>
      <div className="cta_container">
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <h2 className="title">ADD TODO</h2>
            <input
              type="text"
              className=""
              onChange={titleUpdateHandler}
              placeholder="title"
            />

            <input
              type="text"
              className=""
              onChange={todoUpdateHandler}
              placeholder="todo"
            />

            <button onClick={UpdateTodoHandler}>ADD</button>
          </Modal>
        )}
        <span style={{ color: "#7B2CBF" }} onClick={() => setEditModal(true)}>
          Edit
        </span>

       
        <span
          style={{ color: "red" }}
          onClick={DeleteTodoHandler}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default Card;
