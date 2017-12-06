import React, { Component } from "react";
import ResultsContainer from "../../containers/ResultsContainer";
import CommentsContainer from "../../containers/CommentsContainer";
import { formatResults } from "../../services/formatResults.js";
import { Header, Icon, Image, Transition } from "semantic-ui-react";
import Timer from "./Timer";

const ChallengeView = props => {
  return (
    <div>
      <Header centered as="h4" textAlign="center">
        <Timer
          deadline={props.challenge.deadline}
          createdAt={props.challenge.createdAt}
        />
      </Header>
      <Header centered as="h2" icon textAlign="center">
        <Icon name="trophy" circular />
        {props.challenge ? props.challenge.name : ""}
      </Header>
      <Header style={{ padding: "0px" }} centered as="h4" textAlign="center">
        {props.challenge ? props.challenge.description : ""}
      </Header>
      <Header style={{ padding: "0px" }} centered as="h4" textAlign="center">
        {props.challenge.voter
          ? props.voted
            ? `You voted for Team ${props.challenge.voter.team}`
            : "You haven't voted yet"
          : ""}
      </Header>
      {props.challenge.teamOne ? (
        <ResultsContainer
          challenge={props.challenge}
          handleVote={props.handleVote}
        />
      ) : (
        ""
      )}
      <CommentsContainer />
    </div>
  );
};

export default ChallengeView;
