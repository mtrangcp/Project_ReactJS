import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import fullLogo from "../assets/images/trello-logo-full.png";

export default function Header() {
  return (
    <AppBar position="static" className="header">
      <Toolbar className="toolbar">
        <div className="div-logo">
          <img src={fullLogo} alt="img full logo" />
        </div>
        <div className="search-navigation">
          <IconButton className="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            className="navigation"
            color="inherit"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
