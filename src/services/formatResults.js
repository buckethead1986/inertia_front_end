const getObject = () => {
  return {
    name: "",
    description: "",
    deadline: "",
    createdAt: "",
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
};

const resultsObject = getObject();

const clearResultsObject = () => {
  resultsObject.name = "";
  resultsObject.description = "";
  resultsObject.deadline = "";
  resultsObject.createdAt = "";
  resultsObject.teamOne = {
    name: "",
    participants: []
  };
  resultsObject.teamTwo = {
    name: "",
    participants: []
  };
  resultsObject.spectators = {
    users: [],
    votedTeamOne: [],
    votedTeamTwo: []
  };
};

const challengeName = challenge => {
  resultsObject.name = challenge.name;
  resultsObject.description = challenge.description;
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

const voted = currentUser => {
  const userIds = resultsObject.spectators.users.map(user => {
    return user.id;
  });

  const userIdsTeamOne = resultsObject.spectators.votedTeamOne.map(user => {
    return user.id;
  });

  const userIdsTeamTwo = resultsObject.spectators.votedTeamTwo.map(user => {
    return user.id;
  });
  if (userIds.includes(currentUser.id)) {
    resultsObject["voter"] = {};
    resultsObject["voter"]["voted"] = false;
    resultsObject["voter"]["team"] = null;
  } else if (userIdsTeamOne.includes(currentUser.id)) {
    resultsObject["voter"] = {};
    resultsObject["voter"]["voted"] = true;
    resultsObject["voter"]["team"] = 1;
  } else if (userIdsTeamTwo.includes(currentUser.id)) {
    resultsObject["voter"] = {};
    resultsObject["voter"]["voted"] = true;
    resultsObject["voter"]["team"] = 2;
  } else {
    console.log("Isn't a spectator");
  }
};

const deadline = challenge => {
  resultsObject.deadline = challenge.criteria;
  resultsObject.createdAt = challenge.created_at;
};

export const formatResults = (challenge, currentUser) => {
  clearResultsObject();
  challengeName(challenge);
  deadline(challenge);
  teamNames(challenge.team_names);
  filterParticipants(challenge);
  sortVotes(challenge);
  voted(currentUser);
  return resultsObject;
};
