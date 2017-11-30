import React from "react";
import { Dropdown } from "semantic-ui-react";

// import { stateOptions } from "../common";
// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]

const SearchDropdown = props => (
  <Dropdown
    onChange={props.changeUser}
    placeholder={props.title}
    search
    selection
    options={props.data}
  />
);

export default SearchDropdown;

// user plus
