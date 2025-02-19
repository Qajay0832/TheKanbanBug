import React, { useEffect, useState } from "react";
import "./styles.css";
import Button from "../Button/index.jsx";

const EditModal = ({
  isOpen,
  closeModal,
  EditTodo,
  editModalGetter,
}) => {
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("todo");
  const [taskDesc, setTaskDesc] = useState("");
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${
      (new Date().getMonth() + 1).length === 1
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)
    }-${new Date().getDate()}`
  );
  const [priority, setPriority] = useState("high");
  useEffect(() => {
    setTaskName(editModalGetter.title);
    setTaskDesc(editModalGetter.desc);
    setPriority(editModalGetter.priority);
    setDate(editModalGetter.deadline);
    setStatus(editModalGetter.status);
  }, [editModalGetter._id]);
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClickOutside}>
          <p className="modal-title"> Edit Todo !</p>
          <div className="modal-content">
            <div className="input-wrapper">
              <input
                type="text"
                className="custom-input"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <textarea
                rows="5"
                className="custom-input"
                placeholder="Task Description"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                className="custom-input"
                type="date"
                placeholder="Deadline"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

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
            <Button text={"Edit Todo"} onClick={()=>EditTodo(taskName,taskDesc,priority,status,editModalGetter._id,date)} />
            <hr />
            <Button onClick={closeModal} text={"Close"} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
