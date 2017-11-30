import _ from "lodash";
import React, { Component } from "react";
import { Button, Image, List, Transition } from "semantic-ui-react";

class TeamMembers extends Component {
  state = {
    items: this.props.users.slice(0, 0),
    toggledOn: false,
    icon: "chevron down"
  };

  num_of_users = this.props.users.length;

  handleChange = () => {
    let newItems;
    let newIcon;
    if (this.state.toggledOn) {
      newIcon = "chevron up";
      newItems = this.props.users.slice(
        0,
        this.state.items.length + this.num_of_users
      );
    } else {
      newIcon = "chevron down";
      newItems = this.state.items.slice(0, 0);
    }

    const toggle = !this.state.toggledOn;
    this.setState({
      items: newItems,
      toggledOn: toggle,
      icon: newIcon
    });
  };

  render() {
    console.log(this.state);
    const { items } = this.state;

    return (
      <div>
        <Button.Group>
          <Button icon={this.state.icon} onClick={this.handleChange} />
        </Button.Group>

        <Transition.Group
          as={List}
          duration={200}
          divided
          size="small"
          verticalAlign="middle"
        >
          {items.map(item => (
            <List.Item key={item}>
              <Image />
              <List.Content header={_.startCase(item)} />
            </List.Item>
          ))}
        </Transition.Group>
      </div>
    );
  }
}

export default TeamMembers;
