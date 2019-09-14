import React from "react";

export const Timer = props => {
  return (
    <div>
      <h1>
        {props.minutesRemaining} : {props.secondsRemaining}
      </h1>
    </div>
  );
};
