import React, { useState } from "react";

import "./App.css";
import Card from "./Components/Cards/Card";
import Modal from "./Components/Modal/Backdrop";
import Navbar from "./Components/Navbar/Navbar";
import { useAddTodoMutation, useGetAllTodosQuery } from "./Services/TodoApi";

function App() {
  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading, isFetching, refetch } = useGetAllTodosQuery();
  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });
  const [addTodo, result] = useAddTodoMutation();
  const todochangeHandler = (e) => {
    setTodo({ body: e.target.value, title: todo.title });
  };

  const titlechangeHandler = (e) => {
    setTodo({ title: e.target.value, body: todo.body });
  };

  //add a todo
  const addTodoHandler= () => {
    addTodo({
      title: todo.title,
      body: todo.body,
      id: Math.floor(Math.random() * 100),
    })
      .unwrap()
      .then((data) => {
        console.log(data);
      });
      // force re-fetches the data
    refetch()
    setShowModal(false);
  };

  return (
    <div className="App">
      <Navbar setModal={setShowModal} />
     <div>
     {error && <p>Something went wrong</p>}
      {isFetching && <p>fetching ...</p>}
     {isLoading && <p>Loading ...</p>}
      {data?.map((todo) => (
        <Card key={todo.id} id={todo.id} todos={todo.body} />
      ))}
     </div>
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

          <button onClick={addTodoHandler}>ADD</button>
        </Modal>
      )}
    </div>
  );
}

export default App;
