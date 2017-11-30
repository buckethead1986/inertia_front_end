import React from "react";
import Dropdown from "react-dropdown";
const options = ["one", "two", "three"];
const defaultOption = "Select a challenge type";
const teamOptions = ["Team A", "Team B", "Spectator"];

class ChallengeForm extends React.Component {
  constructor() {
    super();

    this.state = {
      participants: [],
      spectators: []
    };
  }

  render() {
    return (
      <div>
        <Dropdown
          options={options}
          onChange={this._onSelect}
          value={defaultOption}
          // placeholder="Select an option"
        />
        Challenge Name <input type="text" /> <br />
        Challenge Description <input type="text" /> <br />
        <label>Participant</label>
        <div>
          Name<input type="text" />
          <br />
          Team<Dropdown
            options={teamOptions}
            onChange={this._onSelect}
            value={"Select Team"}
            // placeholder="Select an option"
          />
        </div>
        <label>Spectator</label>
        <input type="text" />
      </div>
    );
  }
}

export default ChallengeForm;

// <div class="ui dropdown">
//   <div class="text">File</div>
//   <i class="dropdown icon" />
//   <div class="menu">
//     <div class="item">New</div>
//     <div class="item">
//       <span class="description">ctrl + o</span>
//       Open...
//     </div>
//     <div class="item">
//       <span class="description">ctrl + s</span>
//       Save as...
//     </div>
//     <div class="item">
//       <span class="description">ctrl + r</span>
//       Rename
//     </div>
//     <div class="item">Make a copy</div>
//     <div class="item">
//       <i class="folder icon" />
//       Move to folder
//     </div>
//     <div class="item">
//       <i class="trash icon" />
//       Move to trash
//     </div>
//     <div class="divider" />
//     <div class="item">Download As...</div>
//     <div class="item">
//       <i class="dropdown icon" />
//       Publish To Web
//       <div class="menu">
//         <div class="item">Google Docs</div>
//         <div class="item">Google Drive</div>
//         <div class="item">Dropbox</div>
//         <div class="item">Adobe Creative Cloud</div>
//         <div class="item">Private FTP</div>
//         <div class="item">Another Service...</div>
//       </div>
//     </div>
//     <div class="item">E-mail Collaborators</div>
//   </div>
// </div>;
