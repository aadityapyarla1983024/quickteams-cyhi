import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function DropDownNav({ open, toggleDrawer }) {
  const navItems = [
    { label: "Browse Teams", to: "/selectteams" },
    { label: "Float Team", to: "/floatnewteam" },
    { label: "Events", to: "/events" }, // update route as needed
  ];

  const DrawerList = (
    <Box
      sx={{ width: "100vw", height: "100%", backgroundColor: "black" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List sx={{ mt: "60%", width: "60%", mx: "auto" }}>
        {navItems.map(({ label, to }, index) => (
          <Fragment key={label}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                sx={{ color: "white", textDecoration: "none" }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ backgroundColor: "gray" }} />
          </Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      sx={{ backgroundColor: "black" }}
      open={open}
      anchor="left"
      onClose={toggleDrawer(false)}
    >
      {DrawerList}
    </Drawer>
  );
}
