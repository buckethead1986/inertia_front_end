import React from "react";
import { Menu } from "semantic-ui-react";

const LoginNavbar = props => {
  return (
    <Menu>
      {props.location === "/login" ? (
        <Menu.Item position="right" name="Sign up" onClick={props.signup}>
          Not a user? Click here to sign up!
        </Menu.Item>
      ) : (
        <Menu.Item position="right" name="To Login" onClick={props.backToLogin}>
          Back to Login
        </Menu.Item>
      )}
    </Menu>
  );
};

export default LoginNavbar;
