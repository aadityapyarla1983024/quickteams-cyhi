import React, { Fragment } from "react";
import { Stack, Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

// Google provider setup
const provider = new GoogleAuthProvider();

export default function LogoutFirstPage() {
  const auth = getAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/homepage", { replace: true });
    }
  }, [user, navigate]);

  const onGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("User logged in successfully");

      // Check if user profile exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        // New user: create profile and redirect to profile form
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          bio: "",
          skills: [],
          strengths: [],
        });
        navigate("/createnewprofile");
      } else {
        navigate("/homepage");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Stack
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          style={{ marginTop: "3rem" }}
          width="400px"
          src="/ChatGPT Image Sep 5, 2025, 04_04_59 PM.png"
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
