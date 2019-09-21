import React from "react";

export const Timer = props => {
  return (
    <div>
      <h2>
        {props.minutes < 10 ? "0" + props.minutes : props.minutes} :{" "}
        {props.seconds < 10 ? "0" + props.seconds : props.seconds}
      </h2>
    </div>
  );
};
