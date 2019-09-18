import React from "react";

export const Timer = props => {
  return (
    <div>
      <h1>
        {props.minutes < 10 ? "0" + props.minutes : props.minutes} :{" "}
        {props.seconds < 10 ? "0" + props.seconds : props.seconds}
      </h1>
    </div>
  );
};
