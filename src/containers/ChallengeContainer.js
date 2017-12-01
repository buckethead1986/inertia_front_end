import React, { Component } from "react";
import ResultsContainer from "./ResultsContainer";
import CommentsContainer from "./CommentsContainer";
import challenge from "../api/challengeData";
import Challenge from "../components/createChallenge/challenge";

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
