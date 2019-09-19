import React from "react";

export const ToDo = props => {
  return (
    <div>
      <h1>To-Do(s)</h1>
      {props.todos.map(todo => {
        return <div>{todo}</div>;
      })}
    </div>
  );
};
