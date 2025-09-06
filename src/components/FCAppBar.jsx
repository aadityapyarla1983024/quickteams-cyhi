import React, { Fragment, useContext } from "react";
import ResponsiveAppBar from "./responsiveappbar";
import DropDownNav from "./appbardrawer";
import { AuthContext } from "../contexts/AuthContext";

export default function FCAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { user, profile } = useContext(AuthContext); // assume you provide AuthContext

  return (
    <Fragment>
      <ResponsiveAppBar toggleDrawer={toggleDrawer} user={user} profile={profile} />
      <DropDownNav open={open} toggleDrawer={toggleDrawer} />
    </Fragment>
  );
}
