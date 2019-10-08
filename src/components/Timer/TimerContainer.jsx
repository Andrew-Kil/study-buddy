import React, { Component } from "react";
import { Timer } from "./Timer";
import alertSound from "../../assets/alert.mp3";
import "./Timer.scss";

export default class TimerContainer extends Component {
  state = {
    isTicking: false,
    isPomodoro: true,
    isShortBreak: false,
    isLongBreak: false,
    minutes: 25,
    seconds: 0,
    pomodorosCompleted: JSON.parse(localStorage.getItem("myPomodoros")) || 0
  };

  audio = new Audio(alertSound);

  componentDidUpdate() {
    document.title = `${
      this.state.minutes < 10 ? 0 + this.state.minutes : this.state.minutes
    }:${
      this.state.seconds < 10 ? "0" + this.state.seconds : this.state.seconds
    } - Study Buddy`;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ seconds: this.state.seconds - 1 });
  }

  checkTime(min, sec) {
    if (min === 0 && sec === 1) {
      clearInterval(this.timer);
      this.playAlert();
      this.setState({ isTicking: false });
      if (this.state.isPomodoro) {
        this.setState({
          pomodorosCompleted: this.state.pomodorosCompleted + 1
        });
        localStorage.setItem(
          "myPomodoros",
          JSON.stringify(this.state.pomodorosCompleted)
        );
      }
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

  playTimer() {
    this.timer = setInterval(() => {
      this.checkTime(this.state.minutes, this.state.seconds);
      this.tick();
    }, 1000);
  }

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
    this.setState({ isTicking: false });
    if (this.state.isPomodoro) {
      this.setState({
        minutes: 25,
        seconds: 0
      });
    }
    if (this.state.isShortBreak) {
      this.setState({
        minutes: 5,
        seconds: 0
      });
    }
    if (this.state.isLongBreak) {
      this.setState({
        minutes: 15,
        seconds: 0
      });
    }
  };

  changeTimer = (time, type) => {
    this.pauseTimer();
    if (type === "pomodoro") {
      this.setState({
        isPomodoro: true,
        isShortBreak: false,
        isLongBreak: false
      });
    }
    if (type === "shortBreak") {
      this.setState({
        isPomodoro: false,
        isShortBreak: true,
        isLongBreak: false
      });
    }
    if (type === "longBreak") {
      this.setState({
        isPomodoro: false,
        isShortBreak: false,
        isLongBreak: true
      });
    }
    this.setState({ minutes: time, seconds: 0 });
  };

  render() {
    return (
      <div className="timer-container">
        <div className="options-buttons-container">
          <div
            onClick={() => this.changeTimer(25, "pomodoro")}
            className="options-buttons">
            Pomodoro
          </div>
          <div
            onClick={() => this.changeTimer(5, "shortBreak")}
            className="options-buttons">
            Short Break
          </div>
          <div
            onClick={() => this.changeTimer(15, "longBreak")}
            className="options-buttons">
            Long Break
          </div>
        </div>
        <Timer
          minutes={this.state.minutes}
          seconds={this.state.seconds}></Timer>
        <div className="action-buttons-container">
          <div
            className="pause-play-button"
            onClick={this.state.isTicking ? this.pauseTimer : this.resumeTimer}>
            {this.state.isTicking ? (
              <i className="fas fa-pause-circle fa-3x"></i>
            ) : (
              <i className="fas fa-play-circle fa-3x"></i>
            )}
          </div>
          <div className="restart-button" onClick={this.restartTimer}>
            <i className="fas fa-undo-alt fa-3x"></i>
          </div>
        </div>
        <h4>Pomodoros Completed: {this.state.pomodorosCompleted}</h4>
      </div>
    );
  }
}
