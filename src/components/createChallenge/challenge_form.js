import React from "react";
import SearchDropdown from "./search_dropdown";

class ChallengeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      participants: [{ name: "" }],
      spectators: []
    };
  }

  addField = e => {
    e.preventDefault();
    this.setState({
      participants: [...this.state.participants, { name: "" }]
    });
  };

  subtractField = e => {
    e.preventDefault();
    this.setState({
      participants: [...this.state.participants]
    });
  };

  render() {
    return (
      <div>
        <h1>Make a New Challenge</h1>
        <div className="ui form">
          <form
            onSubmit={e => {
              console.log("submitted");
              e.preventDefault();
              // this.props.handleCreateCocktail(this.state);
            }}
          >
            <SearchDropdown
              types={[
                { text: "One on One", value: "One on One" },
                { text: "Request an opponent", value: "Request an opponent" },
                { text: "Multi-person Teams", value: "Multi-person Teams" }
              ]}
            />
            <div>
              Name <input className="inputField" type="text" />
            </div>
            <div>
              Description <input type="text" />
            </div>
            <br />
            <h3>Add Participants</h3>
            {this.state.participants.map((participant, i) => (
              <div key={i} className="fields">
                <div className="twelve wide field">
                  <label>Participant Name</label>
                  <input
                    name="name"
                    placeholder="Participant name..."
                    // onChange={e => this.handleProportionChange(e, i)}
                  />
                </div>
                <div className="ui inline dropdown">
                  <input type="hidden" name="team" />
                  <i className="dropdown icon" />
                  <div className="default text">Select Team</div>
                  <div className="menu">
                    <div className="item" data-value="0">
                      Team A
                    </div>
                    <div className="item" data-value="1">
                      Team B
                    </div>
                    <div className="item" data-value="2">
                      Spectator
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="field">
              <div
                className="ui basic blue circular icon button"
                onClick={this.addField}
              >
                <i className="plus icon" />
              </div>
            </div>
            <button className="ui large primary button" type="submit">
              Create Challenge
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChallengeForm;
