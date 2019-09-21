import React, { Component } from "react";

import { Timer } from "./Timer";

import "./Timer.scss";

export default class TimerContainer extends Component {
  state = {
    isStarted: false,
    isTicking: true,
    minutes: 25,
    seconds: 0
  };

  componentDidUpdate() {
    document.title = `(${
      this.state.minutes < 10 ? 0 + this.state.minutes : this.state.minutes
    }:${
      this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds
    }) - Study Buddy`;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer() {
    this.timer = setInterval(() => {
      this.checkTime(this.state.minutes, this.state.seconds);
      this.tick();
    }, 1000);
  }

  tick() {
    this.setState({ seconds: this.state.seconds - 1 });
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

  startTimer = e => {
    this.setState({ isStarted: true });
    this.timer = setInterval(() => {
      this.checkTime(this.state.minutes, this.state.seconds);
      this.tick();
    }, 1000);
  };

  pauseTimer = e => {
    clearInterval(this.timer);
    this.setState({ isTicking: false });
  };

  playTimer = e => {
    this.setState({ isTicking: true });
    this.timer = setInterval(() => {
      this.checkTime(this.state.minutes, this.state.seconds);
      this.tick();
    }, 1000);
  };

  restartTimer = e => {
    clearInterval(this.timer);
    this.setState({
      isTicking: true,
      minutes: 25,
      seconds: 0
    });
    this.timer = setInterval(() => {
      this.checkTime(this.state.minutes, this.state.seconds);
      this.tick();
    }, 1000);
  };

  render() {
    const { isStarted } = this.state;
    return isStarted ? (
      <>
        <Timer
          minutes={this.state.minutes}
          seconds={this.state.seconds}></Timer>
        <div className="buttons-container">
          <button
            className="pause-play-button"
            onClick={this.state.isTicking ? this.pauseTimer : this.playTimer}>
            {this.state.isTicking ? (
              <i className="fas fa-pause-circle fa-3x"></i>
            ) : (
              <i className="fas fa-play-circle fa-3x"></i>
            )}
          </button>
          <button className="restart-button" onClick={this.restartTimer}>
            <i className="fas fa-undo-alt fa-3x"></i>
          </button>
        </div>
      </>
    ) : (
      <button className="start-button" onClick={this.startTimer}>
        <i className="fas fa-hourglass-start fa-3x"></i>
      </button>
    );
  }
}
