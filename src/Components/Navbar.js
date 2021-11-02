import { AppBar, makeStyles, Menu, MenuItem, Toolbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 20,
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <FastfoodIcon color="secondary" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MyRestaurant
          </Typography>
          <IconButton aria-haspopup="true" onClick={handleMenu} color="inherit">
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted={false}
            PaperProps={{
              style: {
                transform: "translateX(5px) translateY(7px)",
              },
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                history.push("/add");
                handleClose();
              }}
            >
              Add
            </MenuItem>
            <MenuItem
              onClick={() => {
                history.push("/view");
                handleClose();
              }}
            >
              View Hotels
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
