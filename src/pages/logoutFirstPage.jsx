import React, { Fragment } from "react";
import { Stack, Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export default function LogoutFirstPage({ app }) {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const onGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("User logged in successfuly");
        const user = result.user;
        console.log(user);
        navigate("/createnewprofile", { state: {} });
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <Fragment>
      <ToastContainer />
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
          onClick={onGoogleSignIn}
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
    </Fragment>
  );
}
