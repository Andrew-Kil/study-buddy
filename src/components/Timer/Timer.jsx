import React from "react";

export const Timer = props => {
  return (
    <div>
      <h2>
        <div>
          {props.minutes < 10 ? "0" + props.minutes : props.minutes} :{" "}
          {props.seconds < 10 ? "0" + props.seconds : props.seconds}
        </div>
      </h2>
    </div>
  );
};
