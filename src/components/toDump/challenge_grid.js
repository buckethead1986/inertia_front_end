import React from "react";
import { Grid } from "semantic-ui-react";
import PickDate from "./pick_date";

class ChallengeGrid extends React.Component {
  //changes moment() date info to human readable output, non-military time, correct AM/PM.
  formatTime = () => {
    const deadline = this.props.currentDeadline.toString().split(" ");
    const deadlineTimeSplit = `${deadline[4]}`.split(":");
    if (parseInt(deadlineTimeSplit[0]) > 11) {
      deadlineTimeSplit[0] = parseInt(deadlineTimeSplit[0]) - 12;
      deadline[7] = "PM";
    } else {
      deadlineTimeSplit[0] = deadlineTimeSplit[0];
      deadline[7] = "AM";
    }
    if (deadlineTimeSplit[0] === "00") {
      deadlineTimeSplit[0] = "12";
    }
    const deadlineDate = `${deadlineTimeSplit[0]}:${deadlineTimeSplit[1]} ${deadline[7]} on ${deadline[0]}, ${deadline[1]} ${deadline[2]}, ${deadline[3]}`;
    return deadlineDate;
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <div onChange={this.props.changeName}>
              Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeTeamAName}>
              Team A Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeTeamBName}>
              Team B Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeDescription}>
              Description <br />
              <textarea />
            </div>
            {this.props.deadline === true ? (
              <PickDate changeDeadline={this.props.changeDeadline} />
            ) : null}
            <br />
          </Grid.Column>
          <Grid.Column width={8}>
            {this.props.currentName !== "" ? (
              <div>
                "{this.props.currentName}"
                <div>pits</div>
                <div>"{this.props.currentTeamAName}"</div>
                <div>vs</div>
                <div>"{this.props.currentTeamBName}"</div>
              </div>
            ) : null}

            {this.props.currentName !== "" &&
            this.props.currentDescription !== "" ? (
              <div>
                <div>IN A NO HOLDS BARRED MATCH DECIDING</div>
                <div>"{this.props.currentDescription}"</div>
              </div>
            ) : null}
            {this.props.currentDeadline !== "" &&
            this.props.currentName !== "" &&
            this.props.currentDescription !== "" ? (
              <div>By {this.formatTime()} </div>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ChallengeGrid;
