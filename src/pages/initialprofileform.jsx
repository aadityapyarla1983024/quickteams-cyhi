import React, { Fragment, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField } from "@mui/material";
import MultipleSelectChip from "../components/chipinput";
import { onAuthStateChanged } from "firebase/auth";
import BioInput from "../components/bioinput";

export default function InitialProfileForm() {
  const [avatarSrc, setAvatarSrc] = React.useState(undefined);
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    bio: "",
    skills: [],
    strengths: [],
  });
  const navigate = useNavigate();

  const onSubmit = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        setAvatarSrc(user.photoURL);
        setUserData((prev) => ({
          ...prev,
          name: user.displayName,
          email: user.email,
        }));
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, file);

      const downloadURL = await getDownloadURL(avatarRef);

      await updateProfile(user, { photoURL: downloadURL });

      setAvatarSrc(downloadURL);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <Fragment>
      <Stack spacing={3} sx={{ width: "70%", mx: "auto", mt: "10%" }}>
        <ButtonBase
          component="label"
          role={undefined}
          tabIndex={-1}
          aria-label="Avatar image"
          sx={{
            borderRadius: "40px",
            "&:has(:focus-visible)": {
              outline: "2px solid",
              outlineOffset: "2px",
            },
          }}
        >
          <Avatar sx={{ width: 150, height: 150 }} alt="Upload new avatar" src={avatarSrc} />
          <input
            type="file"
            accept="image/*"
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            }}
            onChange={handleAvatarChange}
          />
        </ButtonBase>

        <TextField disabled id="name" value={userData.name} label="Name" variant="outlined" />
        <TextField id="email" value={userData.email} label="Email" disabled variant="outlined" />
        <BioInput handleSubmit={onSubmit} />
        <Stack spacing={2}>
          <MultipleSelectChip handleSubmit={onSubmit} name="Skills" />
          <MultipleSelectChip handleSubmit={onSubmit} name="Strengths" />
        </Stack>
        <Stack>
          <Button
            onClick={(e) => {
              console.log(userData);
              navigate("/homepage");
            }}
            sx={{ width: "45%", mx: "auto" }}
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  );
}
