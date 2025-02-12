import React from "react";
import { Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Todo from "./pages/todoList/Todo.jsx";

const RouteComponent = () => {
  const token = sessionStorage.getItem('authToken');
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={token?<Todo />:<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouteComponent;
