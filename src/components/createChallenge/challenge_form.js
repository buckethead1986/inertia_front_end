import React from "react";
import SelectionDropdown from "./selection_dropdown";
import SearchDropdown from "./search_dropdown";
import TeamGrid from "./team_grid";

class ChallengeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSelectedUser: "",
      currentSelectedTeam: "",
      participants: []
    };
  }

  addParticipant = e => {
    e.preventDefault();
    this.setState({
      participants: [
        ...this.state.participants,
        {
          name: this.state.currentSelectedUser,
          team: this.state.currentSelectedTeam
        }
      ]
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

  render() {
    return (
      <div>
        <h1>Make a New Challenge</h1>
        <form
          onSubmit={e => {
            console.log("submitted");
            e.preventDefault();
            // this.props.handleCreateCocktail(this.state);
          }}
        >
          <SelectionDropdown
            title="Select Challenge Type"
            data={[
              { key: "One on One", text: "One on One", value: "One on One" },
              {
                key: "Request an opponent",
                text: "Request an opponent",
                value: "Request an opponent"
              },
              {
                key: "Multi-person teams",
                text: "Multi-person Teams",
                value: "Multi-person Teams"
              }
            ]}
          />
          <div>
            Name <input className="inputField" type="text" />
          </div>
          <div>
            Description <input type="text" />
          </div>
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
            data={[
              { key: 1, value: "Nicholas", text: "Nicholas" },
              { key: 2, value: "Robert", text: "Robert" },
              { key: 3, value: "Laura", text: "Laura" },
              { key: 4, value: "Becky", text: "Becky" },
              { key: 5, value: "Gene", text: "Gene" }
            ]}
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
            <TeamGrid participants={this.state.participants} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeForm;

// <div className="field">
//   <div
//     className="ui basic blue circular icon button"
//     onClick={this.addField}
//   >
//     <i className="plus icon" />
//   </div>
// </div>

// addField = e => {
//   e.preventDefault();
//   this.setState({
//     participants: [...this.state.participants, { name: "" }]
//   });
// };
//
// subtractField = e => {
//   e.preventDefault();
//   this.setState({
//     participants: [...this.state.participants]
//   });
// };
