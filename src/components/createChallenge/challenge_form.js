import React from "react";
import { Redirect } from "react-router";
import SelectionDropdown from "./selection_dropdown";
import SearchDropdown from "./search_dropdown";
import TeamGrid from "./team_grid";
import ChallengeGrid from "./challenge_grid";
import ChallengeTypeDropdown from "./challenge_type_dropdown";

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
      fireRedirect: false
    };
  }

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
      this.setState(
        {
          users: this.state.users.filter(user => {
            return user.username !== this.state.currentSelectedUser;
          }),
          participants: [
            ...this.state.participants,
            { ...currentUser, role: this.state.currentSelectedTeam }
          ],
          currentSelectedUser: ""
        },
        () => this.postParticipantData()
      );
    }
  };

  //posts challenge data to API upon form submit
  postChallengeData() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      name: this.state.challengeName,
      description: this.state.challengeDescription,
      challenge_type: this.state.challengeType,
      criteria: this.state.challengeDeadline,
      team_names: this.state.teamAName
    };
    fetch("http://localhost:3001/api/v1/challenges", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    // .then(res => this.postParticipantData());
  }

  postParticipantData = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      body
    };
    console.log(this.state.participants);
    fetch("http://localhost:3001/api/v1/user_challenges", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  changeChallengeType = (e, data) => {
    if (data.value === "Deadline") {
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

  changeChallengeDeadline = data => {
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

  //updates team A name, with a few checks to prevent naming confusion of equal names
  // changeTeamAName = e => {
  //   if (e.target.value === "Spectators") {
  //     this.setState({
  //       teamAName: "Spectaturds"
  //     });
  //   } else if (e.target.value === this.state.teamBName) {
  //     this.setState({
  //       teamAName: e.target.value + "2"
  //     });
  //   } else if (e.target.value === "Es") {
  //     this.setState({
  //       teamAName: "ES! ES! ES!"
  //     });
  //   } else if (e.target.value === "Jason") {
  //     this.setState({
  //       teamAName: "Navy Blue Tracksuits"
  //     });
  //   } else if (e.target.value === "Tim") {
  //     this.setState({
  //       teamAName: "I want an invite to the wedding"
  //     });
  //   } else if (e.target.value !== "") {
  //     this.setState({
  //       teamAName: e.target.value
  //     });
  //   } else {
  //     this.setState({
  //       teamAName: "Team A"
  //     });
  //   }
  // };

  //updates team B name, with a few checks to prevent naming confusion of equal names
  // changeTeamBName = e => {
  //   if (e.target.value === "Spectators") {
  //     this.setState({
  //       teamBName: "Special Snowflakes"
  //     });
  //   } else if (e.target.value === this.state.teamAName) {
  //     this.setState({
  //       teamBName: e.target.value + "2"
  //     });
  //   } else if (e.target.value === "Es") {
  //     this.setState({
  //       teamBName: "OH MY GOD IT'S ES"
  //     });
  //   } else if (e.target.value === "Jason") {
  //     this.setState({
  //       teamBName: "Cat-e-gor-ees"
  //     });
  //   } else if (e.target.value === "Tim") {
  //     this.setState({
  //       teamBName: "Beanies for everyone!"
  //     });
  //   } else if (e.target.value !== "") {
  //     this.setState({
  //       teamBName: e.target.value
  //     });
  //   } else {
  //     this.setState({
  //       teamBName: "Team B"
  //     });
  //   }
  // };

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

  submitForm = e => {
    this.setState({ fireRedirect: true });
  };

  render() {
    return (
      <div>
        <h1>Make a New Challenge</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.postChallengeData();
            this.submitForm();
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
          <ChallengeGrid
            deadline={this.state.deadline}
            changeName={this.changeChallengeName}
            changeDescription={this.changeChallengeDescription}
            changeDeadline={this.changeChallengeDeadline}
            changeTeamAName={this.changeTeamAName}
            changeTeamBName={this.changeTeamBName}
            currentName={this.state.challengeName}
            currentDescription={this.state.challengeDescription}
            currentTeamAName={this.state.teamAName}
            currentTeamBName={this.state.teamBName}
            currentDeadline={this.state.challengeDeadline}
          />
          <br />
          <button className="ui large primary button" type="submit">
            Create Challenge
          </button>
          <br />
        </form>
        {this.state.fireRedirect && <Redirect to={"/challenges/:id"} />}
      </div>
    );
  }
}

export default ChallengeForm;

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
