import React, { Component } from "react";

import { Timer } from "./Timer";

export default class TimerContainer extends Component {
  state = {
    minutes: 25,
    seconds: 0
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.checkTime(this.state.minutes, this.state.seconds);
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      seconds: this.state.seconds - 1
    });
  }

  checkTime(min, sec) {
    if (min === 0 && sec === 1) {
      clearInterval(this.timer);
    }
    if (min > 0 && sec === 0) {
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: 60
      });
    }
  }

  render() {
    return (
      <Timer minutes={this.state.minutes} seconds={this.state.seconds}></Timer>
    );
  }
}
