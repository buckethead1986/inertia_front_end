import React from "react";
import SearchDropdown from "../createChallenge/SearchDropdown";
import { Card, Icon, Image, Transition, Button } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filteredUsers: [],
      currentSelectedUser: ""
    };
  }
  //
  componentDidMount() {
    // fetch(`${this.props.url}users`)
    //   .then(res => res.json())
    //   .then(json =>
    this.setState({
      users: this.props.users,
      filteredUsers: this.props.users
    });
    // );
  }

  //removes currently logged in user from list of other users.
  filterCurrentUser = () => {
    const filteredUserList = this.state.users.filter(user => {
      return user.id !== this.props.currentUser.id;
    });
    return filteredUserList;
  };
  //
  // componentWillReceiveProps(nextProps) {
  //   if (this.state.users !== nextProps.users) {
  //     this.setState({
  //       users: nextProps.users,
  //       usersMinusCurrentUser: this.filterCurrentUser(nextProps.users)
  //     });
  //   }
  // }

  changeUserInput = (e, data) => {
    const filteredUsers = this.state.users.filter(user => {
      return (
        user.username.includes(data.searchQuery) &&
        user.id !== this.props.currentUser.id
      );
    });
    this.setState({
      filteredUsers: filteredUsers
    });
  };

  render() {
    const UserCards = this.state.filteredUsers.map(user => {
      console.log(user);
      let color = "";
      if (user.id % 5 === 0) {
        color = "blue";
      } else if (user.id % 5 === 4) {
        color = "green";
      } else if (user.id % 5 === 3) {
        color = "yellow";
      } else if (user.id % 5 === 2) {
        color = "orange";
      } else if (user.id % 5 === 1) {
        color = "red";
      }
      return (
        <Card color={color} onClick={() => this.props.showUser(user.id)}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="/assets/images/avatar/large/steve.jpg"
            />
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>Super Cool</Card.Meta>
            <Card.Description>
              {user.user_challenges.length === 1
                ? `Involved in ${user.user_challenges.length} challenge`
                : `Involved in ${user.user_challenges.length} challenges`}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="13" />

            <Grid.Column width="3">
              <SearchDropdown
                changeUserInput={this.changeUserInput}
                label="Select User"
                title="Select User"
                data={this.state.users}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group>{UserCards}</Card.Group>
      </div>
    );
  }
}

export default AllUsers;
