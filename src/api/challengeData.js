// This is the data shape for the fetch request for challenges
const challenge = [
  {
    id: 1,
    name: "Blogging in Style",
    description: "Who can wear the most formal outfit to blogs?",
    type: "deadline",
    criteria: null,
    deadline: "Friday @ 5pm",
    team_names: ["The Avengers", "The Incredibles"],
    // Here we'll render all the user_challenges with the id of the challenge we're currently showing
    user_challenge: [
      // All the challenge ids here will be the same
      {
        id: 1,
        user: {
          // This is really user_id - in Rails we'll replace it with the user object corresponding to that id
          id: 1,
          name: "Nick"
        },
        challenge_id: 1,
        role: 1 // 1 refers to team 1
      },
      {
        id: 2,
        user: {
          id: 2,
          name: "Robert"
        },
        challenge_id: 1,
        role: 2 // 2 refers to team 2
      },
      {
        id: 3,
        user: {
          id: 3,
          name: "Dylan"
        },
        challenge_id: 1,
        role: 3 // 3 refers to spectator
      }
    ]
  }
];

export default challenge;
