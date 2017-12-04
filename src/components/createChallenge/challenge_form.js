import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import SelectionDropdown from "./selection_dropdown";
import SearchDropdown from "./search_dropdown";
import TeamGrid from "./team_grid";
import ChallengeGrid from "./challenge_grid";
import ChallengeTypeDropdown from "./challenge_type_dropdown";
import ChallengeTest from "./challenge_test";
import DateTime from "react-datetime";
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
const options = [
  { key: 1, text: "Deadline", value: "deadline" },
  { key: 2, text: "Not Deadline", value: "not deadline" }
];
const team_options = [
  { text: "Spectator", value: 3 },
  { text: "Team A", value: 1 },
  { text: "Team B", value: 2 }
];

const url = "http://localhost:3001/api/v1/";

class ChallengeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      challengeType: "",
      challengeDeadline: "",
      challengeName: "",
      challengeDescription: "",
      teamAName: "Team A",
      teamBName: "Team B",
      currentSelectedUser: "",
      currentSelectedTeam: "",
      participants: [],
      users: [],
      deadline: false,
      fireRedirect: false,
      waiverClicked: false,
      redirection: ""
    };
  }

  formatTime = () => {
    if (this.state.challengeDeadline !== undefined) {
      const deadline = this.state.challengeDeadline.toString().split(" ");
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
      const deadlineDate = `By ${deadlineTimeSplit[0]}:${deadlineTimeSplit[1]} ${deadline[7]} on ${deadline[0]}, ${deadline[1]} ${deadline[2]}, ${deadline[3]}`;
      return deadlineDate;
    } else {
      return "Your Deadline is invalid";
    }
  };

  //when users prop comes from async fetch request (in App.js), updates state
  componentWillReceiveProps = nextProps => {
    this.setState({
      users: nextProps.users
    });
  };

  // only adds participant to participants state if both name and team fields arent blank,
  //then filters user state to remove user of that name (so they cant be added to multiple teams),
  //adds that user to participants state (to show up in TeamGrid, and be posted in a fetch to user_controller API)
  //and sets currentSelectedUser state to "", to prevent a bug where they could be added to a team
  //repeatedly
  addParticipant = () => {
    const currentUser = this.state.users.find(user => {
      return user.username === this.state.currentSelectedUser;
    });
    if (
      this.state.currentSelectedTeam !== "" &&
      this.state.currentSelectedUser !== ""
    ) {
      this.setState({
        users: this.state.users.filter(user => {
          return user.username !== this.state.currentSelectedUser;
        }),
        participants: [
          ...this.state.participants,
          { ...currentUser, role: this.state.currentSelectedTeam }
        ],
        currentSelectedUser: ""
      });
    }
  };

  //posts challenge data to API upon form submit
  postChallengeData = e => {
    if (this.state.waiverClicked === true) {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      const body = {
        name: this.state.challengeName,
        description: this.state.challengeDescription,
        challenge_type: this.state.challengeType,
        criteria: this.state.challengeDeadline,
        public: true,
        team_names: this.state.teamAName + "/" + this.state.teamBName,
        user_challenges: []
      };
      return fetch(`${url}challenges`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(json => this.postParticipantData(json));
    }
  };

  postParticipantData = json => {
    const json_id = json.id;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    this.state.participants.forEach(part => {
      const body = {
        challenge_id: json.id,
        user_id: part.id,
        role: part.role
      };
      fetch(`${url}user_challenges`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });
    });
    this.submitForm(json_id);
  };

  changeChallengeType = (e, data) => {
    if (data.value === "deadline") {
      this.setState({
        deadline: true,
        challengeType: "Deadline"
      });
    } else {
      this.setState({
        deadline: false,
        challengeType: "Not Deadline"
      });
    }
  };

  changeTeamAName = e => {
    switch (e.target.value) {
      case "Spectators":
        this.setState({
          teamAName: "Spectaturds"
        });
        break;
      case this.state.teamBName:
        this.setState({
          teamAName: e.target.value + "2"
        });
        break;
      case "Es":
        this.setState({
          teamAName: "ES! ES! ES!"
        });
        break;
      case "Jason":
        this.setState({
          teamAName: "Navy Blue Tracksuits"
        });
        break;
      case "Tim":
        this.setState({
          teamAName: "I want an invite to the wedding"
        });
        break;
      case "":
        this.setState({
          teamAName: "Team A"
        });
        break;
      default:
        this.setState({
          teamAName: e.target.value
        });
    }
  };
  changeTeamBName = e => {
    switch (e.target.value) {
      case "Spectators":
        this.setState({
          teamBName: "Special Snowflakes"
        });
        break;
      case this.state.teamAName:
        this.setState({
          teamBName: e.target.value + "2"
        });
        break;
      case "Es":
        this.setState({
          teamBName: "OH MY GOD IT'S ES"
        });
        break;
      case "Jason":
        this.setState({
          teamBName: "Cat-e-gor-ees"
        });
        break;
      case "Tim":
        this.setState({
          teamBName: "Beanies for everyone!"
        });
        break;
      case "":
        this.setState({
          teamBName: "Team B"
        });
        break;
      default:
        this.setState({
          teamBName: e.target.value
        });
    }
  };

  changeChallengeDeadline = data => {
    // console.log(data);
    this.setState({
      challengeDeadline: data._d
    });
  };

  changeChallengeName = e => {
    this.setState({
      challengeName: e.target.value
    });
  };

  changeChallengeDescription = e => {
    this.setState({
      challengeDescription: e.target.value
    });
  };

  changeUser = (e, data) => {
    this.setState({
      currentSelectedUser: data.value
    });
  };

  changeTeam = (e, data) => {
    this.setState({
      currentSelectedTeam: data.value
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = json_id => {
    this.setState({
      fireRedirect: true,
      redirection: `/challenges/${json_id}`
    });
  };

  clickWaiver = () => {
    this.setState(prevState => {
      return { waiverClicked: !prevState.waiverClicked };
    });
  };

  render() {
    return (
      <div>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <h2>Make a New Challenge</h2>
                <Form.Group widths="equal">
                  <Form.Field
                    onChange={this.changeChallengeType}
                    control={Select}
                    label="Challenge Type"
                    options={options}
                    placeholder="Challenge Type"
                  />
                </Form.Group>
                {this.state.deadline === true ? (
                  <Form.Group widths="equal">
                    <DateTime
                      onBlur={this.changeChallengeDeadline}
                      inputProps={{ placeholder: new Date() }}
                    />
                  </Form.Group>
                ) : null}
                <Form.Group widths="equal">
                  <Form.Field
                    name="challengeName"
                    onChange={this.changeChallengeName}
                    id="challenge-name"
                    control={Input}
                    label="Challenge Name"
                    placeholder="Challenge Name"
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field
                    name="teamAName"
                    onChange={this.changeTeamAName}
                    id="team-a-name"
                    control={Input}
                    label="Team A name"
                    placeholder="Team A name"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    name="teamBName"
                    onChange={this.changeTeamBName}
                    id="team-b-name"
                    control={Input}
                    label="Team B Name"
                    placeholder="Team B Name"
                  />
                </Form.Group>

                <Form.Field
                  name="challengeDescription"
                  onChange={this.changeChallengeDescription}
                  control={TextArea}
                  label="Challenge Description"
                  placeholder="What's going to happen in this challenge?"
                />
                <Form.Field
                  onChange={this.clickWaiver}
                  control={Checkbox}
                  label="Nothing dangerous or illegal will happen because of this challenge"
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <h2>Add Participants</h2>

                <Form.Group widths="equal">
                  <Form.Field
                    onChange={this.changeTeam}
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
                      data={this.state.users}
                    />
                  </Form.Field>
                  <Form.Field>
                    <button
                      onClick={this.addParticipant}
                      className="ui large primary button"
                    >
                      Add Participant
                    </button>
                  </Form.Field>
                </Form.Group>
                <TeamGrid
                  teamNames={[this.state.teamAName, this.state.teamBName]}
                  participants={this.state.participants}
                />
              </Grid.Column>

              <Grid.Column width={5}>
                <h2>Current Lineup</h2>
                {this.state.challengeName !== "" ? (
                  <div>
                    <h3>Challenge: {this.state.challengeName}</h3>
                    <h4>pits</h4>
                    <h3>Team A: {this.state.teamAName}</h3>
                    <h4>vs</h4>
                    <h3>Team B: {this.state.teamBName}</h3>
                  </div>
                ) : null}

                {this.state.challengeName !== "" &&
                this.state.challengeDescription !== "" ? (
                  <div>
                    <br />
                    <h3>IN A NO HOLDS BARRED MATCH DECIDING</h3>
                    <h3>{this.state.challengeDescription}</h3>
                  </div>
                ) : null}
                {this.state.challengeDeadline !== "" &&
                this.state.challengeName !== "" &&
                this.state.challengeDescription !== "" ? (
                  <h3>{this.formatTime()} </h3>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Form.Field onClick={this.postChallengeData} control={Button}>
                Submit
              </Form.Field>
            </Grid.Row>
          </Grid>
        </Form>
        {this.state.fireRedirect && <Redirect to={this.state.redirection} />}
      </div>
    );
  }
}

export default ChallengeForm;

// <div>
//   <h1>Make a New Challenge</h1>
//   <form
//     onSubmit={e => {
//       e.preventDefault();
//       this.postChallengeData();
//       this.submitForm();
//     }}
//   >
//     <ChallengeTypeDropdown
//       onChange={this.changeChallengeType}
//       title="Select Challenge Type"
//       data={[
//         { key: "Deadline", text: "Deadline", value: "Deadline" },
//         {
//           key: "Not Deadline",
//           text: "Not Deadline",
//           value: "Not Deadline"
//         }
//       ]}
//     />
//     <ChallengeGrid
//       deadline={this.state.deadline}
//       changeName={this.changeChallengeName}
//       changeDescription={this.changeChallengeDescription}
//       changeDeadline={this.changeChallengeDeadline}
//       changeTeamAName={this.changeTeamAName}
//       changeTeamBName={this.changeTeamBName}
//       currentName={this.state.challengeName}
//       currentDescription={this.state.challengeDescription}
//       currentTeamAName={this.state.teamAName}
//       currentTeamBName={this.state.teamBName}
//       currentDeadline={this.state.challengeDeadline}
//     />
//     <br />
//     <button className="ui large primary button" type="submit">
//       Create Challenge
//     </button>
//     <br />
//   </form>
//   {this.state.fireRedirect && <Redirect to={"/challenges/:id"} />}
// </div>

//add participants code, to be put on specific challenge show page.
// <h3>Add Participants</h3>
// <div>
//   <SearchDropdown
//     changeUser={this.changeUser}
//     title="Participant"
//     data={this.state.users}
//   />
//
//   <SelectionDropdown
//     changeTeam={this.changeTeam}
//     title="Select Team"
//     data={[
//       { text: "Spectator", value: 3 },
//       { text: "Team A", value: 1 },
//       { text: "Team B", value: 2 }
//     ]}
//   />
//   <button
//     onClick={this.addParticipant}
//     className="ui large primary button"
//     type="submit"
//   >
//     Add Participant
//   </button>
//   <br />
//   <h3>Current Lineup</h3>
//   <div>
//     <TeamGrid
//       participants={this.state.participants}
//       teamNames={[this.state.teamAName, this.state.teamBName]}
//     />
//   </div>
// </div>
