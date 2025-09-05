import React, { Fragment } from "react";
import { Stack, Button } from "@mui/material";
import "./app.css";

export default function LogoutFirstPage(props) {
  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img
        style={{ marginTop: "5rem" }}
        width="400px"
        src="src/assets/ChatGPT Image Sep 5, 2025, 04_04_59 PM.png"
        alt=""
      />
      <Button
        sx={{
          borderRadius: "50px",
          color: "black",
          background: "white",
          mb: 10,
          width: "40%",
          mx: "auto",
        }}
        variant="contained"
      >
        Sign in with Google
      </Button>
    </Stack>
  );
}
