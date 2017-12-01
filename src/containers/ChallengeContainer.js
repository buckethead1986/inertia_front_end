import React, { Component } from "react";
import ResultsContainer from "./ResultsContainer";
import CommentsContainer from "./CommentsContainer";
import { Header, Icon, Image } from "semantic-ui-react";
import challenge from "../api/challengeData";

class ChallengeContainer extends Component {
  render() {
    return (
      <div>
        <Header
          style={{ padding: "20px", paddingBottom: "0px" }}
          centered
          as="h2"
          icon
          textAlign="center"
        >
          <Icon name="trophy" circular />
          {challenge[0].name}
        </Header>
        <Header style={{ padding: "0px" }} centered as="h4" textAlign="center">
          {challenge[0].description}
        </Header>
        <ResultsContainer challenge={challenge} />
        <CommentsContainer />
      </div>
    );
  }
}

export default ChallengeContainer;
