import React from "react";
import { Routes, Route ,Navigate, Link} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Todo from "./pages/todoList/Todo.jsx";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Todo />} />
    </Routes>
  );
};

export default RouteComponent;
