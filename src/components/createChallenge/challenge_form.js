import React from "react";

class ChallengeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      participants: [],
      spectators: []
    };
  }

  render() {
    return (
      <div>
        <div className="ui selection dropdown">
          <input type="hidden" name="challenge_type" />
          <i className="dropdown icon" />
          <div className="default text">Challenge Type</div>
          <div className="menu">
            <div className="item" data-value="1">
              Challenge One Person
            </div>
            <div className="item" data-value="0">
              Challenge Multiple People
            </div>
          </div>
        </div>
        <div>
          Name <input type="text" />
        </div>
        <div>
          Description <input type="text" />
        </div>
        <div>
          Add Participant <input type="text" />
        </div>
      </div>
    );
  }
}

export default ChallengeForm;
