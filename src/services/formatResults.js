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
    users: []
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

export const formatResults = challenge => {
  teamNames(challenge.team_names);
  filterParticipants(challenge);
  return resultsObject;
};