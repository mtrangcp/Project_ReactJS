import { Button } from "antd";
import boardsBlack from "../assets/icons/boards-black.png";
import calender from "../assets/icons/calender.png";
import btnSelect from "../assets/icons/btn-select.png";

export default function Workspace() {
  return (
    <div className="yourWorkspaces">
      <div className="workspaces-left">
        <img src={boardsBlack} alt="img Workspaces" />
        <span>Your Workspaces</span>
      </div>
      <div className="workspaces-right">
        <div className="btn-gr">
          <Button type="primary" className="btn-share">
            Share
          </Button>
          <Button type="default" className="btn-export">
            Export
          </Button>
        </div>
        <div className="select-time">
          <img src={calender} alt="img calender" />
          <span>This week</span>
          <img className="btn-select" src={btnSelect} alt="img select" />
        </div>
      </div>
    </div>
  );
}
