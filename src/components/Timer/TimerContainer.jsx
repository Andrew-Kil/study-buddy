import React, { Component } from "react";
import { Timer } from "./Timer";
import alertSound from "../../assets/alert.mp3";
import timerTypes from "./timerTypes";
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
    const { minutes, seconds } = this.state;
    document.title = `${minutes < 10 ? 0 + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    } - Study Buddy`;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ seconds: this.state.seconds - 1 });
  }

  checkTime(min, sec) {
    const { isPomodoro, pomodorosCompleted, minutes } = this.state;
    if (min === 0 && sec === 1) {
      clearInterval(this.timer);
      this.playAlert();
      this.setState({ isTicking: false });
      if (isPomodoro) {
        this.setState({ pomodorosCompleted: pomodorosCompleted + 1 });
        localStorage.setItem("myPomodoros", JSON.stringify(pomodorosCompleted));
      }
    }
    if (min > 0 && sec === 0) {
      this.setState({
        minutes: minutes - 1,
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
    const { minutes, seconds } = this.state;
    this.timer = setInterval(() => {
      this.checkTime(minutes, seconds);
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

  getNewMinutes = () => {
    const { isLongBreak, isShortBreak, isPomodoro } = this.state;
    return isPomodoro ? 25 : isLongBreak ? 15 : isShortBreak ? 5 : 0;
  };

  restartTimer = e => {
    clearInterval(this.timer);
    this.setState({
      isTicking: false,
      minutes: this.getNewMinutes(),
      seconds: 0
    });
  };

  changeTimer = (time, type) => {
    this.pauseTimer();
    const newState = timerTypes[type];
    this.setState({ ...newState, minutes: time, seconds: 0 });
  };

  render() {
    const { minutes, seconds, isTicking, pomodorosCompleted } = this.state;
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
        <Timer minutes={minutes} seconds={seconds}></Timer>
        <div className="action-buttons-container">
          <div
            className="pause-play-button"
            onClick={isTicking ? this.pauseTimer : this.resumeTimer}>
            {isTicking ? (
              <i className="fas fa-pause-circle fa-3x"></i>
            ) : (
              <i className="fas fa-play-circle fa-3x"></i>
            )}
          </div>
          <div className="restart-button" onClick={this.restartTimer}>
            <i className="fas fa-undo-alt fa-3x"></i>
          </div>
        </div>
        <h4>Pomodoros Completed: {pomodorosCompleted}</h4>
      </div>
    );
  }
}
