import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

export default function BioInput({ handleSubmit, userbio }) {
  const [bio, setBio] = useState("");

  useEffect(() => {
    setBio(userbio || "");
  }, [userbio]); // <-- dependency added here

  return (
    <TextField
      onChange={(e) => {
        setBio(e.target.value);
        handleSubmit("bio", e.target.value);
      }}
      value={bio}
      id="outlined-multiline-flexible"
      label="Bio"
      multiline
      maxRows={3}
    />
  );
}
