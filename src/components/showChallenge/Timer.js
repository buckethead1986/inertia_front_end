import React from "react";
import { Button, Progress } from "semantic-ui-react";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: {}
    };
  }

  componentDidMount() {
    this.time();
  }

  getTimeRemaining(endtime, createdAt) {
    let tb = Date.parse(endtime) - Date.parse(createdAt);
    let t = Date.parse(endtime) - Date.parse(new Date());
    let tr = (tb - t) / tb;
    console.log(tr);
    let progress = tr * 100;
    console.log(progress);
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    console.log(endtime);
    console.log(createdAt);

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
    console.log(this.state.timeLeft.days);
  };

  render() {
    return (
      <div onMouseOver={this.handleHover}>
        {this.state.timeLeft.percent ? (
          <Progress percent={this.state.timeLeft.percent} indicating />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Timer;
