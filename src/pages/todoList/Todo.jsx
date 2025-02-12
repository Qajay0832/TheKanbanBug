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
  const [editModalContent, setEditModalContent] = useState({});

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
    // setEditModalGetter({}); //due to this if the modal closes the data did not change
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
    // console.log(token);
    try {
      const tododata = await axios.get("https://thekanbanbugbackend.onrender.com/todo", {
        headers: {
          token: token,
        },
      });
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
      const deletion = await axios.delete("https://thekanbanbugbackend.onrender.com/todo", {
        headers: {
          token: token,
          id: id,
          status: status,
        },
      });
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
  const MoveTodo = async (token, id, status, fetchTodo) => {
    try {
      const shiftTodo = await axios.post("https://thekanbanbugbackend.onrender.com/shift", {
        token: token,
        id: id,
        status: status,
      });
      if (shiftTodo) {
        setTodoList(() => {
          return { ...shiftTodo.data };
        });
        toast.success(
          `Moved Todo to ${status == "todo" ? "In Progress" : "Completed"}`
        );
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
      const todoposted = await axios.post("https://thekanbanbugbackend.onrender.com/createtodo", {
        token: token,
        todo: {
          title: taskName,
          desc: taskDesc,
          deadline: date,
          priority: priority,
          status: "todo",
        },
      });
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
  // const GetTodo = async (id, status) => {
  //   console.log(id, status);

  //   const token = sessionStorage.getItem("authToken"); // Retrieve token from localStorage
  //   if (!token) {
  //     navigate("/");
  //   }
  //   try {
  //     const getTodo = await axios.get("https://thekanbanbugbackend.onrender.com/gettodo", {
  //       headers: {
  //         token: token,
  //         id: id,
  //         status: status,
  //       },
  //     });
  //     if (getTodo) {
  //       console.log(getTodo);
  //       // setEditModalContent(() => {
  //       //   return { ...getTodo.data };
  //       // });
  //       toast.success("getted");
  //       return ;
  //     } else {
  //       toast.error("Fails!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Unable to fetch Todo!");
  //   }
  // };
  // const EditTodo=async (taskName, taskDesc, date, priority) => {
  //   const token = sessionStorage.getItem("authToken"); // Retrieve token from localStorage
  //   if (!token) {
  //     navigate("/");
  //   }
  //   try{
  //     const getTodo=await axios.get("https://thekanbanbugbackend.onrender.com/createtodo",{
  //       headers:{
  //         token:token,
  //         id:id,
  //         status:status
  //       }
  //     })
  //   }
  // }

  const EditTodo = async (taskName, taskDesc, priority, status, id, date) => {
    const token = sessionStorage.getItem("authToken"); // Retrieve token from localStorage
    if (!token) {
      navigate("/");
    }
    try {
      const editedTodo = await axios.post("https://thekanbanbugbackend.onrender.com/edit", {
        token: token,
        id: id,
        status: status,
        desc: taskDesc,
        title: taskName,
        priority: priority,
        deadline: date,
      });
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
          <section className="todoSection">
            <h2>Todo</h2>
            <div id="today">
              {todoList.todo.map((item) => {
                return (
                  <Cards
                    openEditModal={() => openEditModal(item)}
                    key={item._id}
                    title={item.title}
                    desc={item.desc}
                    status={item.status}
                    priority={item.priority}
                    deadline={item.deadline}
                    id={item._id}
                    MoveTodo={() => MoveTodo(token, item._id, item.status)}
                    DeleteTodo={() => DeleteTodo(token, item._id, item.status)}
                  />
                );
              })}
            </div>
          </section>
          <section className="todoSection">
            <h2>Inprogress</h2>
            <div id="future">
              {todoList.inProgress.map((item) => {
                return (
                  <Cards
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
                    MoveTodo={() => MoveTodo(token, item._id, item.status)}
                    DeleteTodo={() => DeleteTodo(token, item._id, item.status)}
                  />
                );
              })}
            </div>
          </section>
          <section className="todoSection">
            <h2>Completed</h2>
            <div id="completed">
              {todoList.completed.map((item) => {
                return (
                  <Cards
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
                    MoveTodo={() => MoveTodo(token, item._id, item.status)}
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
