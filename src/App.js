import React, { useState } from "react";

import "./App.css";
import Card from "./Components/Cards/Card";
import Modal from "./Components/Modal/Backdrop";
import Navbar from "./Components/Navbar/Navbar";
import { useAddTodoMutation, useGetAllTodosQuery } from "./Services/TodoApi";

function App() {
  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading, isFetching } = useGetAllTodosQuery();
  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });
  const [addTask, result] = useAddTodoMutation();
  const todochangeHandler = (e) => {
    setTodo({ body: e.target.value, title: todo.title });
  };

  const titlechangeHandler = (e) => {
    setTodo({ title: e.target.value, body: todo.body });
  };

  const addTodo = () => {
    addTask({
      title: todo.title,
      body: todo.body,
      id: Math.floor(Math.random() * 100),
    })
      .unwrap()
      .then((data) => {
        console.log(data);
      });
    setShowModal(false);
  };

  return (
    <div className="App">
      <Navbar setModal={setShowModal} />
      {error && <p>Something went wrong</p>}
      {isFetching && <p>Loading ...</p>}
      {isLoading && <p>Loading ...</p>}
      {data?.map((todo) => (
        <Card key={todo.id} id={todo.id} todos={todo.body} />
      ))}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="title">ADD TODO</h2>
          <input
            type="text"
            className=""
            onChange={titlechangeHandler}
            placeholder="title"
          />

          <input
            type="text"
            className=""
            onChange={todochangeHandler}
            placeholder="todo"
          />

          <button onClick={addTodo}>ADD</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
