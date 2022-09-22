import React, { useState } from "react";
import "./Navbar.css";
const Navbar = ({ setModal }) => {
  return (
    <div className="nav_container">
      <h2>RTK-Query TODO</h2>
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default Navbar;
