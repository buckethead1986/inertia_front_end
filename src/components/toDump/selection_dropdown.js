import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

const SelectionDropdown = props => (
  <Dropdown
    onChange={props.changeTeam}
    placeholder={props.title}
    selection
    options={props.data}
  />
);

export default SelectionDropdown;
