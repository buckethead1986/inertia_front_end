import React, { Component } from "react";

class ResultsContainer extends Component {
  render() {
    return (
      <div className="ui right aligned grid">
        <div className="center aligned two column row">
          <div className="column">
            <div className="ui segment">Center aligned row</div>
          </div>
          <div className="column">
            <div className="ui segment">Center aligned row</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
