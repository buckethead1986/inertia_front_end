import React from "react";
import ResultsContainer from "../../containers/ResultsContainer";
import CommentsContainer from "../../containers/CommentsContainer";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import Timer from "./Timer";
import ReactHover from "react-hover";
const options = {
  followCursor: true,
  shiftX: -10,
  shiftY: -50
};

class ChallengeView extends React.Component {
  constructor() {
    super();

    this.state = {
      timeLeft: ""
    };
  }
  componentDidMount() {
    this.formatTime();
  }

  formatTime = () => {
    const now = new Date().toISOString();
    const deadline = this.props.challenge.deadline
      .toString()
      .split(" ")[0]
      .split("T");
    const deadlineDate = deadline[0].split("-");
    const deadlineTime = deadline[1].split(":");
    if (parseInt(deadlineTime[0]) > 11) {
      deadlineTime[0] = parseInt(deadlineTime[0]) - 12;
      deadline[7] = "PM";
    } else {
      deadlineTime[0] = deadlineTime[0];
      deadline[7] = "AM";
    }
    if (deadlineTime[0] === "00") {
      deadlineTime[0] = "12";
    }
    if (now < deadline) {
      return `Challenge ends at ${deadlineTime[0]}:${deadlineTime[1]} ${deadline[7]} on ${deadlineDate[1]}/${deadlineDate[2]}/${deadlineDate[0]}`;
    } else {
      return `Challenge ended at ${deadlineTime[0]}:${deadlineTime[1]} ${deadline[7]} on ${deadlineDate[1]}/${deadlineDate[2]}/${deadlineDate[0]}`;
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Segment disabled={this.props.completed}>
          <Header as="h4" textAlign="center">
            <ReactHover options={options}>
              <ReactHover.Trigger type="trigger">
                <Timer
                  deadline={this.props.challenge.deadline}
                  createdAt={this.props.challenge.createdAt}
                  deadlineOver={this.props.deadlineOver}
                />
              </ReactHover.Trigger>
              <ReactHover.Hover type="hover">
                <blockquote>{this.formatTime()}</blockquote>
              </ReactHover.Hover>
            </ReactHover>
          </Header>
          {this.props.completed ? (
            <Header as="h2" icon disabled textAlign="center">
              <Icon name="trophy" circular />
              {this.props.challenge ? this.props.challenge.name : ""}
            </Header>
          ) : (
            <Header as="h2" icon textAlign="center">
              <Icon name="trophy" circular />
              {this.props.challenge ? this.props.challenge.name : ""}
            </Header>
          )}
          {this.props.completed ? (
            <Header
              disabled
              style={{ padding: "0px" }}
              as="h4"
              textAlign="center"
            >
              {this.props.challenge ? this.props.challenge.description : ""}
            </Header>
          ) : (
            <Header style={{ padding: "0px" }} as="h4" textAlign="center">
              {this.props.challenge ? this.props.challenge.description : ""}
            </Header>
          )}
          <Header style={{ padding: "0px" }} as="h4" textAlign="center">
            {this.props.challenge.voter
              ? this.props.voted
                ? `You voted for Team ${this.props.challenge.voter.team}`
                : "You haven't voted yet"
              : ""}
          </Header>
          {this.props.challenge.teamOne ? (
            <ResultsContainer
              challenge={this.props.challenge}
              handleVote={this.props.handleVote}
              completed={this.props.completed}
            />
          ) : (
            ""
          )}
        </Segment>
        <CommentsContainer
          challengeNumber={this.props.challenge.challengeNumber}
          currUser={this.props.currUser}
          url={this.props.url}
        />
      </div>
    );
  }
}

export default ChallengeView;
