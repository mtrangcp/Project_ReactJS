import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import boards from "../assets/icons/boards.png";
import starredBoards from "../assets/icons/starredBoards.png";
import closedBoards from "../assets/icons/closedBoards.png";

export default function Sidebar() {
  return (
    <aside className="aside">
      <p>YOUR WORKSPACES</p>
      <div className="workspaces">
        <div className="boards">
          <a href="index.html" className="item">
            <img src={boards} alt="img boards" />
            <span>Boards</span>
          </a>
          <a href="#" className="item" id="renderStarredboard">
            <img src={starredBoards} alt="img starredBoards" />
            <span>Starred Boards</span>
          </a>
          <a href="#" className="item" id="renderClosedboard">
            <img src={closedBoards} alt="img closedBoards" />
            <span>Closed Boards</span>
          </a>
        </div>
        <div className="line"></div>
        <List>
          <ListItem component="button" className="item">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem component="button" className="item">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </div>
    </aside>
  );
}
