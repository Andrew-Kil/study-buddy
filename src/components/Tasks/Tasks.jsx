import React from "react";

export const Tasks = props => {
  return (
    <div>
      <h1>Tasks List</h1>
      <ul>
        {props.tasks.length ? (
          props.tasks.map((task, idx) => {
            return (
              <div key={idx}>
                <li>
                  <input
                    type="checkbox"
                    onChange={props.completeTask(task)}
                    defaultChecked={task.completed}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                  <i
                    className="fas fa-trash-alt"
                    onClick={props.deleteTask(task)}></i>
                </li>
              </div>
            );
          })
        ) : (
          <div>Write down your task(s)!</div>
        )}
      </ul>
    </div>
  );
};
