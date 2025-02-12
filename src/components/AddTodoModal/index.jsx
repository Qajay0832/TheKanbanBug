import React, { useEffect, useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";

const Modal = ({ isOpen, closeModal, AddTodo, type, status }) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${
      (new Date().getMonth() + 1).length === 1
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)
    }-${new Date().getDate()}`
  );
  const [priority, setPriority] = useState("high");
  const CreateTodo = () => {
    if(taskDesc.length!=0||taskName.length!=0 ){
        AddTodo(taskName, taskDesc, date, priority);
        setTaskName("");
        setTaskDesc("");
        setDate(
          `${new Date().getFullYear()}-${
            (new Date().getMonth() + 1).length === 1
              ? new Date().getMonth() + 1
              : "0" + (new Date().getMonth() + 1)
          }-${new Date().getDate()}`
        );
        setPriority("high");
    }
    else{
      toast.error("taskname and description is required !")
    }
    
  };
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClickOutside}>
          <p className="modal-title"> Add Todo !</p>
          <div className="modal-content">
            <Input
              placeholder="Task Name"
              state={taskName}
              setState={setTaskName}
            />
            <div className="input-wrapper">
              <textarea
                rows="5"
                className="custom-input"
                placeholder="Task Description"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </div>
            <Input
              type="date"
              placeholder="Deadline"
              state={date}
              setState={setDate}
            />
            <select
              className="custom-input"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="priority" disabled>
                Priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button
              text={"Add Item"}
              onClick={CreateTodo}
            />
            <hr/>
            <Button onClick={closeModal} text={"Close"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
