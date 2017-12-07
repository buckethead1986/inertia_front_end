import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

const Navbar = props => {
  return (
    <Menu>
      <Menu.Item name="My Profile" onClick={props.profileLink}>
        My Profile
      </Menu.Item>

      <Menu.Item name="Challenges" onClick={props.challengesLink}>
        Challenges
      </Menu.Item>

      <Menu.Item name="Users" onClick={props.usersLink}>
        Users
      </Menu.Item>

      <Menu.Item name="New Challenge" onClick={props.newChallengeLink}>
        New Challenge
      </Menu.Item>

      <Menu.Item position="right" name="Sign Out" onClick={props.logout}>
        Sign Out
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
