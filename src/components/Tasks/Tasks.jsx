import React from "react";

export const Tasks = props => {
  return (
    <div>
      <h3>Tasks</h3>
      <ul>
        {props.tasks.length ? (
          props.tasks.map((task, idx) => {
            return (
              <div key={idx}>
                <li>
                  {task}
                  <button onClick={props.deleteTask.bind(this, task)}>X</button>
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
