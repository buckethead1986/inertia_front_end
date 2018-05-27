## Overview

Find the application at https://inertial.herokuapp.com

Inertia is a front-end React application that allows users to challenge each
other to complete certain tasks. The teams can be made up of individuals or
groups and the winning group is decided by a group of spectators who watch and
vote on the challenge but do not participate in it. There is no limit to how
many participants or spectators you can have on a challenge.

## Technology

Inertia uses the create-react-app pack for the React skeleton. It's a
single-page application that simulates routes using React Router. The backend
JSON API is built in Ruby on Rails: https://github.com/buckethead1986/Inertia.
The database is Postgres and is responsible for keeping all of the data
pertaining to sessions, users, challenges, and comments. The user authentication
is built using a session controller in Rails and a JWT token to authenticate the
user via the Rails backend and in the user's local browser storage.

## Functionality

A user logs in and can either create or participate in an existing challenge
that they've explicitly been invited to. If they choose to create a challenge,
they'll have access to all of the users on the application. Since there's no
concept of friends or a network, all challenges are public and all users can be
viewed by other users.

When a user creates a challenge, they can add any user. Challenges are
deadline-based, and spectators are only allowed to vote until the challenge
deadline has been reached. On the challenge show page, there is a progress bar
at the top which records the current time in relation to the start and end of
the challenge. When the progress bar is full, the challenge is over and the page
is grayed out. The only functionality present on the show page of a challenge
that has reached its deadline is the ability to view the participants/spectators
along with the other challenge information as well as the ability to comment on
this specific challenge.

In addition to a challenge index, there is a user index where all of the users
in the application are listed. On each user show page, you can see which
challenges a user is participating/spectating in.

## Layout / Design

We achieved a sense of continuity in our design by using the React version of
Semantic UI. This component-based styling allows us to integrate components and
their design more easily. The way we segmented our information was through the
use of Semantic cards. On the challenge show page, there is an accordion feature
that collapses and expands the list of participants on each team and their
spectators. All in all, the design is meant to facilitate user experience so
that a new user finds the application intuitive.

## Design Patterns

We've used several design patterns, but the most essential was our use of the
container vs. presentational component pattern. We use container components that
are often the uppermost parent components (before the App class). These
container components are, for the most part, responsible for holding child
presentational components and for fetching data as state and passing it down as
props. The presentational components (often functional, stateless components)
are used to collect information as props and display it on the page.
