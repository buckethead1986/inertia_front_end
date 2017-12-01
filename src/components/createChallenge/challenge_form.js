import React from "react";
import SelectionDropdown from "./selection_dropdown";
import SearchDropdown from "./search_dropdown";
import TeamGrid from "./team_grid";
import ChallengeGrid from "./challenge_grid";
import ChallengeTypeDropdown from "./challenge_type_dropdown";

class ChallengeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSelectedUser: "",
      currentSelectedTeam: "",
      participants: [],
      users: [],
      teamAName: "Team A",
      teamBName: "Team B",
      deadline: false
    };
  }

  componentWillReceiveProps = nextProps => {
    //when users prop comes from async fetch request (in App.js), updates state
    this.setState({
      users: nextProps.users
    });
  };

  addParticipant = () => {
    // only adds participant to participants state if both name and team fields arent blank,
    //then filters user state to remove user of that name (cant be added twice)
    //and sets currentSelectedUser state to ""
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
          {
            name: this.state.currentSelectedUser,
            team: this.state.currentSelectedTeam
          }
        ],
        currentSelectedUser: ""
      });
    }
  };

  changeTeamAName = e => {
    //updates team A name, with a few checks to prevent naming confusion of equal names
    if (e.target.value === "Spectators") {
      this.setState({
        teamAName: "Spectaturds"
      });
    } else if (e.target.value === this.state.teamBName) {
      this.setState({
        teamAName: e.target.value + "2"
      });
    } else if (e.target.value !== "") {
      this.setState({
        teamAName: e.target.value
      });
    } else {
      this.setState({
        teamAName: "Team A"
      });
    }
  };

  changeTeamBName = e => {
    //updates team A name, with a few checks to prevent naming confusion of equal names

    if (e.target.value === "Spectators") {
      this.setState({
        teamBName: "Special Snowflakes"
      });
    } else if (e.target.value === this.state.teamAName) {
      this.setState({
        teamBName: e.target.value + "2"
      });
    } else if (e.target.value !== "") {
      this.setState({
        teamBName: e.target.value
      });
    } else {
      this.setState({
        teamBName: "Team B"
      });
    }
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

  postChallengeData = () => {
    //posts challenge data to API upon form submit
    console.log("posted");
    const headers = {
      Accepts: "application/json",
      "Content-Type": "application/json"
    };
    const body = {};
    // fetch("https://http://localhost:3001/api/v1/challenges", {
    //   method: "POST",
    //   headers: headers,
    //   body: body
    // });
  };

  changeChallengeType = () => {
    this.setState(prevState => {
      return { deadline: !prevState.deadline };
    });
  };

  render() {
    return (
      <div>
        <h1>Make a New Challenge</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.postChallengeData();
          }}
        >
          <ChallengeTypeDropdown
            onChange={this.changeChallengeType}
            title="Select Challenge Type"
            data={[
              { key: "Deadline", text: "Deadline", value: "Deadline" },
              {
                key: "Not Deadline",
                text: "Not Deadline",
                value: "Not Deadline"
              }
            ]}
          />
          <ChallengeGrid deadline={this.state.deadline} />
          <br />
          <button className="ui large primary button" type="submit">
            Create Challenge
          </button>
          <br />
          <h3>Add Participants</h3>
        </form>
        <div>
          <SearchDropdown
            changeUser={this.changeUser}
            title="Participant"
            data={this.state.users}
          />

          <SelectionDropdown
            changeTeam={this.changeTeam}
            title="Select Team"
            data={[
              { key: 1, text: "Spectator", value: "Spectator" },
              { key: 2, text: "Team A", value: "Team A" },
              { key: 3, text: "Team B", value: "Team B" }
            ]}
          />
          <button
            onClick={this.addParticipant}
            className="ui large primary button"
            type="submit"
          >
            Add Participant
          </button>
          <br />
          <h3>Current Lineup</h3>
          <div>
            <TeamGrid
              participants={this.state.participants}
              teamNames={[this.state.teamAName, this.state.teamBName]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeForm;
