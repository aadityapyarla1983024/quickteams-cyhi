import React from "react";
import { Fragment } from "react";
import ResponsiveAppBar from "./responsiveappbar";
import DropDownNav from "./appbardrawer";

export default function FCAppBar(props) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Fragment>
      <ResponsiveAppBar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
      <DropDownNav open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} />
    </Fragment>
  );
}
