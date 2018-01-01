import React from "react";
import { Progress } from "semantic-ui-react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: {},
      completed: false,
      text: ""
    };
  }

  componentDidMount() {
    this.time();
  }

  getTimeRemaining(endtime, createdAt) {
    let tb = Date.parse(endtime) - Date.parse(createdAt);
    let t = Date.parse(endtime) - Date.parse(new Date());
    if (tb <= 0 || t <= 0) {
      this.setState({
        completed: true
      });
      tb = Math.abs(tb);
      this.props.deadlineOver();
    }
    let tr = (tb - t) / tb;
    let progress = Math.abs(tr * 100);
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    this.setState({
      timeLeft: {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        percent: progress
      }
    });
  }

  time = () => {
    this.getTimeRemaining(this.props.deadline, this.props.createdAt);
  };

  formatTime = () => {
    return (
      this.state.timeLeft.days +
      " days " +
      this.state.timeLeft.hours +
      " hours " +
      this.state.timeLeft.minutes +
      " minutes left"
    );
  };

  handleHover = () => {
    this.setState({
      text: this.state.timeLeft.days
    });
    console.log(this.state.timeLeft.days);
  };

  render() {
    return (
      <div onMouseOver={this.handleHover}>
        {this.state.timeLeft.percent ? (
          this.state.completed ? (
            <Progress percent={this.state.timeLeft.percent} disabled success>
              Challenge Completed
            </Progress>
          ) : (
            <Progress percent={this.state.timeLeft.percent} indicating />
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Timer;
