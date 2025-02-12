import React from "react";
import "./styles.css";
import Done from "../../assests/Done.png";
import Right from "../../assests/Right.png";
import Delete from "../../assests/Delete.png";
import Edit from "../../assests/Edit.png";

function Cards({ title, deadline, status, priority, desc, id,MoveTodo,DeleteTodo,openEditModal}) {

  return (
    <div
      id={id}
      className={`my-card ${
        status == "completed"
          ? "card-completed"
          : priority == "high"
          ? "phigh"
          : priority == "medium"
          ? "pmedium"
          : "plow"
      }`}
    >
      <div className="cardHeader">
        <p className="card-title">{title}</p>
        <div className="cardHeaderContent">
          <p className="headerContent">{deadline}</p>
          <p className="headerContent">{priority}</p>
        </div>
      </div>
      <p className="card-desc headerContent">{desc} </p>
      <div className="imgButtonContainer">
        <img
          src={status == "todo" ? Right : Done}
          alt="Done"
          className={`imgBtn ${status == "completed" && "imgNone"}`}
          onClick={MoveTodo}
        />
        <img
          src={Delete}
          alt="Delete"
          className="imgBtn"
          onClick={DeleteTodo}
        />
        <img
          src={Edit}
          alt="Edit"
          className="imgBtn"
          onClick={openEditModal}
        />

      </div>
    </div>
  );
}

export default Cards;
