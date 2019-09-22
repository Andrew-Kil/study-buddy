import React, { Component } from "react";

import { Timer } from "./Timer";

import alertSound from "../../assets/alert.mp3";

import "./Timer.scss";

export default class TimerContainer extends Component {
  state = {
    isStarted: false,
    isTicking: true,
    minutes: 25,
    seconds: 0
  };

  audio = new Audio(alertSound);

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

  playTimer() {
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
      this.playAlert();
    }
    if (min > 0 && sec === 0) {
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: 60
      });
    }
  }

  playAlert() {
    const startAlert = setInterval(() => {
      this.audio.play();
    }, 1000);
    setTimeout(() => {
      clearInterval(startAlert);
    }, 3000);
  }

  startTimer = e => {
    this.setState({ isStarted: true });
    this.playTimer();
  };

  pauseTimer = e => {
    clearInterval(this.timer);
    this.setState({ isTicking: false });
  };

  resumeTimer = e => {
    this.setState({ isTicking: true });
    this.playTimer();
  };

  restartTimer = e => {
    clearInterval(this.timer);
    this.setState({
      isTicking: true,
      minutes: 25,
      seconds: 0
    });
    this.playTimer();
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
            onClick={this.state.isTicking ? this.pauseTimer : this.resumeTimer}>
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
