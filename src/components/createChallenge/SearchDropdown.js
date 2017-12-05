import React from "react";
import { Dropdown } from "semantic-ui-react";

// import { stateOptions } from "../common";
// stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, ...  ]

const SearchDropdown = props => {
  const users = props.data.map((user, id) => {
    return { key: id, value: user.username, text: user.username };
  });
  // console.log(users);
  return (
    <Dropdown
      onChange={props.changeUser}
      placeholder={props.title}
      search
      selection
      options={users}
    />
  );
};

export default SearchDropdown;

// { key: 1, value: "Nicholas", text: "Nicholas" }
