import React from "react";
import { Dropdown } from "semantic-ui-react";

const UserSearchDropdown = props => {
  const users = props.data.map((user, id) => {
    return { key: id, value: id, text: user.username };
  });
  return (
    <Dropdown
      onChange={props.onChange}
      onSearchChange={props.changeUserInput}
      placeholder={props.title}
      search
      selection
      options={users}
    />
  );
};

export default UserSearchDropdown;
