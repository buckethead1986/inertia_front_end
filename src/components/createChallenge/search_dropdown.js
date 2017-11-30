import React from "react";
import { Dropdown } from "semantic-ui-react";

// import { friendOptions } from "../common";
// const friendOptions = [
//   {
//     text: "Jenny Hess",
//     value: "Jenny Hess",
//     image: { avatar: true, src: "/assets/images/avatar/small/jenny.jpg" }
//   }
// ];

const DropdownSelection = props => (
  <Dropdown placeholder="Select Friend" fluid selection options={props.types} />
);

export default DropdownSelection;
