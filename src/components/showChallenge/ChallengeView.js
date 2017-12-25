import React from "react";
import ResultsContainer from "../../containers/ResultsContainer";
import CommentsContainer from "../../containers/CommentsContainer";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import Timer from "./Timer";

const ChallengeView = props => {
  return (
    <div>
      <Segment disabled={props.completed}>
        <Header centered as="h4" textAlign="center">
          <Timer
            deadline={props.challenge.deadline}
            createdAt={props.challenge.createdAt}
            deadlineOver={props.deadlineOver}
          />
        </Header>
        {props.completed ? (
          <Header centered as="h2" icon disabled textAlign="center">
            <Icon name="trophy" circular />
            {props.challenge ? props.challenge.name : ""}
          </Header>
        ) : (
          <Header centered as="h2" icon textAlign="center">
            <Icon name="trophy" circular />
            {props.challenge ? props.challenge.name : ""}
          </Header>
        )}
        {props.completed ? (
          <Header
            disabled
            style={{ padding: "0px" }}
            centered
            as="h4"
            textAlign="center"
          >
            {props.challenge ? props.challenge.description : ""}
          </Header>
        ) : (
          <Header
            style={{ padding: "0px" }}
            centered
            as="h4"
            textAlign="center"
          >
            {props.challenge ? props.challenge.description : ""}
          </Header>
        )}
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
            completed={props.completed}
          />
        ) : (
          ""
        )}
      </Segment>
      <CommentsContainer
        challengeNumber={props.challenge.challengeNumber}
        currentUser={props.currentUser}
      />
    </div>
  );
};

export default ChallengeView;
