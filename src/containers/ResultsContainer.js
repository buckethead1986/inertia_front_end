import React, { Component } from "react";

class ResultsContainer extends Component {
  render() {
    return (
      <div className="ui link cards">
        <div className="card">
          <div className="image" />
          <div className="content">
            <div className="header">Team Number One</div>
            <div className="meta">
              <a>Your Team</a>
            </div>
            <div className="description">
              Matthew is an interior designer living in New York.
            </div>
          </div>
          <div className="extra content">
            <span className="right floated" />
            <span>
              <i className="user icon" />
              75 Votes
            </span>
          </div>
        </div>
        <div className="card">
          <div className="image" />
          <div className="content">
            <div className="header">Team Number Two</div>
            <div className="meta">
              <a />
            </div>
            <div className="description">
              Elyse is a copywriter working in New York.
            </div>
          </div>
          <div className="extra content">
            <span className="right floated" />
            <span>
              <i className="user icon" />
              151 Votes
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
