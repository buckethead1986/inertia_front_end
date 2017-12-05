import React from "react";
import { Dropdown } from "semantic-ui-react";

const SearchDropdown = props => {
  const users = props.data.map((user, id) => {
    return { key: id, value: user.username, text: user.username };
  });
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
