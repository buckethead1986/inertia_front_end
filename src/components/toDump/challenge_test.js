import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea
} from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
// import PickDate from "./pick_date";
import DateTime from "react-datetime";
import SelectionDropdown from "./selection_dropdown";
import SearchDropdown from "./search_dropdown";
import TeamGrid from "./team_grid";

const options = [
  { key: 1, text: "Deadline", value: "deadline" },
  { key: 2, text: "Not Deadline", value: "not deadline" }
];
const team_options = [
  { text: "Spectator", value: 3 },
  { text: "Team A", value: 1 },
  { text: "Team B", value: 2 }
];
class FormExampleFieldControl extends Component {
  state = {};

  // handleChange = (e, { value }) => this.setState({ value });

  formatTime = () => {
    if (this.props.currentDeadline !== undefined) {
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
    }
  };

  render() {
    const { value } = this.state;
    return (
      <Form>
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <h2>Make a New Challenge</h2>
              <Form.Group widths="equal">
                <Form.Field
                  onChange={this.props.changeChallengeType}
                  control={Select}
                  label="Challenge Type"
                  options={options}
                  placeholder="Challenge Type"
                />
              </Form.Group>
              {this.props.deadline === true ? (
                <Form.Group widths="equal">
                  <DateTime
                    onBlur={this.props.changeDeadline}
                    inputProps={{ placeholder: new Date(), dateFormat: false }}
                  />
                </Form.Group>
              ) : null}
              <Form.Group widths="equal">
                <Form.Field
                  onChange={this.props.changeName}
                  id="challenge-name"
                  control={Input}
                  label="Challenge Name"
                  placeholder="Challenge Name"
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  onChange={this.props.changeTeamAName}
                  id="team-a-name"
                  control={Input}
                  label="Team A name"
                  placeholder="Team A name"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  onChange={this.props.changeTeamBName}
                  id="team-b-name"
                  control={Input}
                  label="Team B Name"
                  placeholder="Team B Name"
                />
              </Form.Group>

              <Form.Field
                onChange={this.props.changeDescription}
                control={TextArea}
                label="Challenge Description"
                placeholder="What's going to happen in this challenge?"
              />
              <Form.Field
                control={Checkbox}
                label="Nothing dangerous or illegal will happen because of this challenge"
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <h2>Add Participants</h2>

              <Form.Group widths="equal">
                <Form.Field
                  onChange={this.props.changeChallengeType}
                  control={Select}
                  label="Select a Team"
                  options={team_options}
                  placeholder="Select a Team"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <SearchDropdown
                    changeUser={this.changeUser}
                    label="Select Participant"
                    title="Participant"
                    data={this.props.users}
                  />
                </Form.Field>
                <Form.Field>
                  <button
                    onClick={this.props.addParticipant}
                    className="ui large primary button"
                    type="submit"
                  >
                    Add Participant
                  </button>
                </Form.Field>
              </Form.Group>
              <TeamGrid
                teamNames={[
                  this.props.currentTeamAName,
                  this.props.currentTeamBName
                ]}
                participants={this.state.participants}
              />
            </Grid.Column>

            <Grid.Column width={5}>
              <h2>Current Lineup</h2>
              {this.props.currentName !== "" ? (
                <div>
                  <h3>Challenge: {this.props.currentName}</h3>
                  <h4>pits</h4>
                  <h3>Team A: {this.props.currentTeamAName}</h3>
                  <h4>vs</h4>
                  <h3>Team B: {this.props.currentTeamBName}</h3>
                </div>
              ) : null}

              {this.props.currentName !== "" &&
              this.props.currentDescription !== "" ? (
                <div>
                  <br />
                  <h3>IN A NO HOLDS BARRED MATCH DECIDING</h3>
                  <h3>"{this.props.currentDescription}"</h3>
                </div>
              ) : null}
              {this.props.currentDeadline !== "" &&
              this.props.currentName !== "" &&
              this.props.currentDescription !== "" ? (
                <h3>By {this.formatTime()} </h3>
              ) : null}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Form.Field control={Button}>Submit</Form.Field>
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

export default FormExampleFieldControl;

// <Form.Group inline>
//   <label>Quantity</label>
//   <Form.Field
//     control={Radio}
//     label="One"
//     value="1"
//     checked={value === "1"}
//     onChange={this.handleChange}
//   />
//   <Form.Field
//     control={Radio}
//     label="Two"
//     value="2"
//     checked={value === "2"}
//     onChange={this.handleChange}
//   />
//   <Form.Field
//     control={Radio}
//     label="Three"
//     value="3"
//     checked={value === "3"}
//     onChange={this.handleChange}
//   />
// </Form.Group>;
