const timerTypes = {
  pomodoro: {
    isPomodoro: true,
    isShortBreak: false,
    isLongBreak: false
  },
  shortBreak: {
    isPomodoro: false,
    isShortBreak: true,
    isLongBreak: false
  },
  longBreak: {
    isPomodoro: false,
    isShortBreak: false,
    isLongBreak: true
  }
};

export default timerTypes;
