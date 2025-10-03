import { Drawer } from "antd";
import boards from "../assets/icons/boards.png";
import starredBoards from "../assets/icons/starredBoards.png";
import closedBoards from "../assets/icons/closedBoards.png";

interface OffcanvasNavProps {
  open: boolean;
  onClose: () => void;
}

export default function OffcanvasNav({ open, onClose }: OffcanvasNavProps) {
  return (
    <Drawer
      title="YOUR WORKSPACES"
      placement="right"
      onClose={onClose}
      open={open}
      className="offcanvas"
    >
      <div className="workspaces workspaces-off">
        <div className="boards">
          <a href="#" className="item">
            <img src={boards} alt="boards" />
            <span>Boards</span>
          </a>
          <a href="#" className="item">
            <img src={starredBoards} alt="starred" />
            <span>Starred Boards</span>
          </a>
          <a href="#" className="item">
            <img src={closedBoards} alt="closed" />
            <span>Closed Boards</span>
          </a>
        </div>
      </div>
    </Drawer>
  );
}
