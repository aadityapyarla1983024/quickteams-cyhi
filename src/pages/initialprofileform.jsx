import React, { Fragment, useEffect, useState } from "react";
import { Avatar, ButtonBase, Stack, TextField, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BioInput from "../components/bioinput";
import TeamMatchAutocomplete from "../components/chipinput";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function InitialProfileForm() {
  const { user, profile } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState(profile?.avatarUrl);
  const [userData, setUserData] = useState(
    profile || {
      name: "",
      email: "",
      bio: "",
      skills: [],
      strengths: [],
      avatarUrl: "",
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        name: user.displayName,
        email: user.email,
      }));
      setAvatarSrc(user.photoURL);
    }
  }, [user]);

  const onSubmit = async (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Avatar upload handler
  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Preview avatar
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload avatar to Firebase Storage and update user profile
    try {
      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, file);
      const downloadURL = await getDownloadURL(avatarRef);

      // Save avatar URL to Firestore
      setAvatarSrc(downloadURL);
      setUserData((prev) => ({
        ...prev,
        avatarUrl: downloadURL,
      }));

      // Also update user's photoURL in Firebase Authentication if needed
      // Not strictly necessary unless you want auth photoURL to change!
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleProfileSubmit = async () => {
    if (!user) return;
    await setDoc(
      doc(db, "users", user.uid),
      {
        ...userData,
        avatarUrl: avatarSrc,
      },
      { merge: true }
    );
    navigate("/homepage");
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
          <TeamMatchAutocomplete handleSubmit={onSubmit} name="Skills" />
        </Stack>
        <Stack>
          <Button
            onClick={handleProfileSubmit}
            sx={{ width: "60%", mx: "auto" }}
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Fragment>
  );
}
