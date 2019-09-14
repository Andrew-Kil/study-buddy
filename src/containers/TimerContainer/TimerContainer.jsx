import React, { Component } from "react";

import { Timer } from "../../components/Timer/Timer";

export default class TimerContainer extends Component {
  state = {
    minutesRemaining: "25",
    secondsRemaining: "00"
  };
  render() {
    return (
      <Timer
        minutesRemaining={this.state.minutesRemaining}
        secondsRemaining={this.state.secondsRemaining}></Timer>
    );
  }
}
