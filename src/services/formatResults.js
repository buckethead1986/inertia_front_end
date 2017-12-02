const resultsObject = {
  teamOne: {
    name: "",
    participants: []
  },
  teamTwo: {
    name: "",
    participants: []
  },
  spectators: {
    users: [],
    votedTeamOne: [],
    votedTeamTwo: []
  }
};

const teamNames = teamNameString => {
  const teamNames = teamNameString.split("/");
  resultsObject.teamOne.name = teamNames[0];
  resultsObject.teamTwo.name = teamNames[1];
};

const filterParticipants = challenge => {
  challenge.user_challenges.forEach(userChallenge => {
    if (userChallenge.role === "1") {
      resultsObject.teamOne.participants.push({
        id: userChallenge.user.id,
        name: userChallenge.user.username
      });
    } else if (userChallenge.role === "2") {
      resultsObject.teamTwo.participants.push({
        id: userChallenge.user.id,
        name: userChallenge.user.username
      });
    } else {
      resultsObject.spectators.users.push({
        id: userChallenge.user.id,
        name: userChallenge.user.username
      });
    }
  });
};

const removeFromSpectators = personObj => {
  const newSpectators = resultsObject.spectators.users.filter(user => {
    return user.id !== personObj.id;
  });

  resultsObject.spectators.users = newSpectators;
};

const sortVotes = challenge => {
  challenge.user_challenges.forEach(userChallenge => {
    const newObj = {
      id: userChallenge.user.id,
      name: userChallenge.user.username
    };
    if (userChallenge.vote === 1) {
      resultsObject.spectators.votedTeamOne.push(newObj);
      removeFromSpectators(newObj);
    } else if (userChallenge.vote === 2) {
      resultsObject.spectators.votedTeamTwo.push(newObj);
      removeFromSpectators(newObj);
    }
  });
};

export const formatResults = challenge => {
  teamNames(challenge.team_names);
  filterParticipants(challenge);
  sortVotes(challenge);
  return resultsObject;
};
