import React, { useEffect, useState } from "react";
import "./todo.css";
import Button from "../../components/Button/index.jsx";
import Cards from "../../components/Cards/index.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../components/AddTodoModal/index.jsx";
import EditModal from "../../components/EditTodoModal/index.jsx";

const Todo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editModalGetter, setEditModalGetter] = useState({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openEditModal = (item) => {
    setEditModalOpen(true);
    setEditModalGetter(item);
  };

  const closeEditModal = () => {
    setEditModalGetter({}); //due to this data refreshes if the modal closes.
    setEditModalOpen(false);
  };
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });
  const token = sessionStorage.getItem("authToken");
  const fetchTodo = async (token) => {
    try {
      const tododata = await axios.get(
        "https://thekanbanbugbackend.onrender.com/todo",
        {
          headers: {
            token: token,
          },
        }
      );
      if (tododata.data) {
        setTodoList(tododata.data.todolist);
        toast.success("successfully fetched todos !");
      } else {
        toast.error("Unable to fetch todos !");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch Todos!");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTodo(token);
    } else {
      navigate("/");
    }
  }, []);
  const DeleteTodo = async (token, id, status) => {
    try {
      const deletion = await axios.delete(
        "https://thekanbanbugbackend.onrender.com/todo",
        {
          headers: {
            token: token,
            id: id,
            status: status,
          },
        }
      );
      if (deletion) {
        setTodoList(() => {
          return { ...deletion.data };
        });
        toast.success("successfully deleted todo");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while deleting todo");
    }
  };
  const MoveTodo = async (token, id, status, targetStatus) => {
    try {
      const shiftTodo = await axios.post(
        "https://thekanbanbugbackend.onrender.com/shift",
        {
          token: token,
          id: id,
          status: status,
          targetStatus: targetStatus,
        }
      );
      if (shiftTodo) {
        setTodoList(() => {
          return { ...shiftTodo.data };
        });
        toast.success(`Moved Todo to ${targetStatus}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while shifting Todo ! Please try again !");
    }
  };

  const AddTodo = async (taskName, taskDesc, date, priority) => {
    const token = sessionStorage.getItem("authToken"); // Retrieve token from localStorage
    if (!token) {
      navigate("/");
    }
    try {
      if (
        taskName.length == 0 ||
        taskDesc.length == 0 ||
        priority.length == 0 ||
        date.length == 0
      ) {
        toast.error("Please fill required  details");
        return;
      }
      const todoposted = await axios.post(
        "https://thekanbanbugbackend.onrender.com/createtodo",
        {
          token: token,
          todo: {
            title: taskName,
            desc: taskDesc,
            deadline: date,
            priority: priority,
            status: "todo",
          },
        }
      );
      if (todoposted.data) {
        setTodoList(() => {
          return { ...todoposted.data };
        });
        closeModal();
      } else {
        console.log("empty", todoposted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EditTodo = async (taskName, taskDesc, priority, status, id, date) => {
    const token = sessionStorage.getItem("authToken"); // Retrieve token from localStorage
    if (!token) {
      navigate("/");
    }
    try {
      if (
        taskName.length == 0 ||
        taskDesc.length == 0 ||
        priority.length == 0 ||
        status.length == 0 ||
        id.length == 0 ||
        date.length == 0
      ) {
        toast.error("Please fill required  details");
        return;
      }
      const editedTodo = await axios.post(
        "https://thekanbanbugbackend.onrender.com/edit",
        {
          token: token,
          id: id,
          status: status,
          desc: taskDesc,
          title: taskName,
          priority: priority,
          deadline: date,
        }
      );
      if (editedTodo) {
        setTodoList(() => {
          return { ...editedTodo.data };
        });
        closeEditModal();
        toast.success("successfully edited todo");
      } else {
        toast.error("Error while editing todo !");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while editing Todo ! Please try again !");
    }
  };

  const handleDragStart = (e, id, token, status) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("status", status);
    e.dataTransfer.setData("token", token);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const draggedCardId = e.dataTransfer.getData("id");
    const sourceStatus = e.dataTransfer.getData("status");
    const token = e.dataTransfer.getData("token");

    if (sourceStatus === targetStatus) return;
    MoveTodo(token, draggedCardId, sourceStatus, targetStatus);
  };

  return (
    <>
      <h1 className="todo-title">The Kanban Bugs</h1>
      <Button
        style={{ textAlign: "center" }}
        onClick={() => openModal("addtodo")}
        text={"Click here to add todo !"}
      />
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        AddTodo={AddTodo}
        type="addtodo"
        token={token}
      />
      <EditModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        // GetTodo={GetTodo}
        editModalGetter={editModalGetter}
        // editModalContent={editModalContent}
        EditTodo={EditTodo}
        token={token}
      />
      <p className="todo-title" style={{ fontSize: "2rem" }}>
        Progress Box
      </p>
      {(todoList.todo.length !== 0 ||
        todoList.inProgress.length !== 0 ||
        todoList.completed.length !== 0) && (
        <div className="sectionContainer">
          <section
            className="todoSection"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            <h2>Todo</h2>
            <div id="today">
              {todoList.todo.map((item) => {
                return (
                  <Cards
                    handleDragStart={handleDragStart}
                    token={token}
                    openEditModal={() => openEditModal(item)}
                    key={item._id}
                    title={item.title}
                    desc={item.desc}
                    status={item.status}
                    priority={item.priority}
                    deadline={item.deadline}
                    id={item._id}
                    MoveTodo={() =>
                      MoveTodo(token, item._id, item.status, "inProgress")
                    }
                    DeleteTodo={() => DeleteTodo(token, item._id, item.status)}
                  />
                );
              })}
            </div>
          </section>
          <section
            className="todoSection"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "inProgress")}
          >
            <h2>Inprogress</h2>
            <div id="future">
              {todoList.inProgress.map((item) => {
                return (
                  <Cards
                    handleDragStart={handleDragStart}
                    token={token}
                    openEditModal={() => openEditModal(item)}
                    key={item._id}
                    title={item.title}
                    desc={item.desc}
                    status={item.status}
                    priority={item.priority}
                    deadline={item.deadline}
                    id={item._id}
                    setTodoList={setTodoList}
                    todoList={todoList}
                    MoveTodo={() =>
                      MoveTodo(token, item._id, item.status, "completed")
                    }
                    DeleteTodo={() => DeleteTodo(token, item._id, item.status)}
                  />
                );
              })}
            </div>
          </section>
          <section
            className="todoSection"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "completed")}
          >
            <h2>Completed</h2>
            <div id="completed">
              {todoList.completed.map((item) => {
                return (
                  <Cards
                    handleDragStart={handleDragStart}
                    token={token}
                    openEditModal={() => openEditModal(item)}
                    key={item._id}
                    title={item.title}
                    desc={item.desc}
                    status={item.status}
                    priority={item.priority}
                    deadline={item.deadline}
                    id={item._id}
                    setTodoList={setTodoList}
                    todoList={todoList}
                    MoveTodo={() =>
                      MoveTodo(token, item._id, item.status, "completed")
                    }
                    DeleteTodo={() => DeleteTodo(token, item._id, item.status)}
                  />
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Todo;
