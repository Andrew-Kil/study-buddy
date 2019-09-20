import React from "react";

export const ToDo = props => {
  return (
    <div>
      <h2>To-Do(s)</h2>
      <ul>
        {props.todos.map((todo, id) => {
          return <li key={id}>{todo}</li>;
        })}
      </ul>
    </div>
  );
};
