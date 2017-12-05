import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

const ChallengeTypeDropdown = props => (
  <Dropdown
    onChange={props.onChange}
    placeholder={props.title}
    selection
    options={props.data}
  />
);

export default ChallengeTypeDropdown;
