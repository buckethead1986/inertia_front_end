import React, { Component } from "react";
import ResultsContainer from "./ResultsContainer";
import CommentsContainer from "./CommentsContainer";
import challenge from "../api/challengeData";

class ChallengeContainer extends Component {
  render() {
    return (
      <div>
        <ResultsContainer />
        <CommentsContainer />
      </div>
    );
  }
}

export default ChallengeContainer;
