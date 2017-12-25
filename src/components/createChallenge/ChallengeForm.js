import React from "react";
import { Redirect } from "react-router";
import { Grid } from "semantic-ui-react";
import SearchDropdown from "./SearchDropdown";
import TeamGrid from "./TeamGrid";
import DateTime from "react-datetime";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  TextArea
} from "semantic-ui-react";
const options = [
  { key: 1, text: "Deadline", value: "deadline" }
  // { key: 2, text: "Not Deadline", value: "not deadline" }
];
const team_options = [
  { text: "Spectator", value: 3 },
  { text: "Team A", value: 1 },
  { text: "Team B", value: 2 }
];

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

  componentDidMount() {
    fetch(`${this.props.url}users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      );
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.state.users !== this.props.users) {
  //     this.setState({
  //       users: nextProps.users
  //     });
  //   }
  // }

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
        user_created: this.props.currUser.id,
        user_challenges: []
      };
      return fetch(`${this.props.url}challenges`, {
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
      fetch(`${this.props.url}user_challenges`, {
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

  updateDropdownTeamA = team => {
    team_options[1].text = this.state.teamAName;
  };

  updateDropdownTeamB = team => {
    team_options[2].text = this.state.teamBName;
  };

  changeTeamAName = e => {
    switch (e.target.value) {
      case "Spectators":
        this.setState(
          {
            teamAName: "Spectaturds"
          },
          () => this.updateDropdownTeamA()
        );
        break;
      case this.state.teamBName:
        this.setState(
          {
            teamAName: e.target.value + "2"
          },
          () => this.updateDropdownTeamA()
        );
        break;
      case "Es":
        this.setState(
          {
            teamAName: "ES! ES! ES!"
          },
          () => this.updateDropdownTeamA()
        );
        break;
      case "Jason":
        this.setState(
          {
            teamAName: "Navy Blue Tracksuits"
          },
          () => this.updateDropdownTeamA()
        );
        break;
      case "Tim":
        this.setState(
          {
            teamAName: "I want an invite to the wedding"
          },
          () => this.updateDropdownTeamA()
        );
        break;
      case "":
        this.setState(
          {
            teamAName: "Team A"
          },
          () => this.updateDropdownTeamA()
        );
        break;
      default:
        this.setState(
          {
            teamAName: e.target.value
          },
          () => this.updateDropdownTeamA()
        );
    }
  };
  changeTeamBName = e => {
    switch (e.target.value) {
      case "Spectators":
        this.setState(
          {
            teamBName: "Special Snowflakes"
          },
          () => this.updateDropdownTeamB()
        );
        break;
      case this.state.teamAName:
        this.setState(
          {
            teamBName: e.target.value + "2"
          },
          () => this.updateDropdownTeamB()
        );
        break;
      case "Es":
        this.setState(
          {
            teamBName: "OH MY GOD IT'S ES"
          },
          () => this.updateDropdownTeamB()
        );
        break;
      case "Jason":
        this.setState(
          {
            teamBName: "Cat-e-gor-ees"
          },
          () => this.updateDropdownTeamB()
        );
        break;
      case "Tim":
        this.setState(
          {
            teamBName: "Beanies for everyone!"
          },
          () => this.updateDropdownTeamB()
        );
        break;
      case "":
        this.setState(
          {
            teamBName: "Team B"
          },
          () => this.updateDropdownTeamB()
        );
        break;
      default:
        this.setState(
          {
            teamBName: e.target.value
          },
          () => this.updateDropdownTeamB()
        );
    }
  };

  changeChallengeDeadline = data => {
    this.setState({
      challengeDeadline: data._d
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
                    onChange={this.handleChange}
                    id="challenge-name"
                    control={Input}
                    label="Challenge Name"
                    placeholder="Challenge Name"
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field
                    onChange={this.changeTeamAName}
                    id="team-a-name"
                    control={Input}
                    label="Team A name"
                    placeholder="Team A name"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    onChange={this.changeTeamBName}
                    id="team-b-name"
                    control={Input}
                    label="Team B Name"
                    placeholder="Team B Name"
                  />
                </Form.Group>

                <Form.Field
                  name="challengeDescription"
                  onChange={this.handleChange}
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
