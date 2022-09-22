import React, { useState } from "react";
import "./Card.css";
import Modal from "../Modal/Backdrop";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../Services/TodoApi";
const Card = ({ todos, id }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });

  const [deleteTask] = useDeleteTodoMutation();
  const [updateTask] = useUpdateTodoMutation();
  const titleUpdateHandler = (e) => {
    setTodo({ title: e.target.value, body: todo.title });
  };

  const todoUpdateHandler = (e) => {
    setTodo({ title: todo.title, body: e.target.value });
  };

  const UpdateTodo = () => {
    //console.log({id,...todo})

    updateTask({ id, ...todo })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditModal(false);
  };

  const DeleteTodo = () => {
    //console.log({id,...todo})

    deleteTask({ id, ...todo })
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    setDeleteModal(false);
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

            <button onClick={UpdateTodo}>ADD</button>
          </Modal>
        )}
        <span style={{ color: "#7B2CBF" }} onClick={() => setEditModal(true)}>
          Edit
        </span>

        {deleteModal && (
          <Modal onClose={() => setDeleteModal(false)}>
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

            <button onClick={DeleteTodo}>ADD</button>
          </Modal>
        )}
        <span
          style={{ color: "red" }}
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default Card;
