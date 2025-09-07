import React, { Fragment, useEffect, useState } from "react";
import { Avatar, ButtonBase, Stack, TextField, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BioInput from "../components/bioinput";
import TeamMatchAutocomplete from "../components/chipinput";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UserProfileView() {
  const { user, profile } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [],
    strengths: [],
    avatarUrl: "",
  });
  const navigate = useNavigate();

  // Sync inputs with Firestore profile on load/updates
  useEffect(() => {
    if (profile) {
      setUserData({
        name: profile.name || "",
        email: profile.email || (user?.email ?? ""),
        bio: profile.bio || "",
        skills: profile.skills || [],
        strengths: profile.strengths || [],
        avatarUrl: profile.avatarUrl || "",
      });
      setAvatarSrc(profile.avatarUrl || user?.photoURL || "");
    }
  }, [profile, user]);

  const onSubmit = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Instant preview
    const reader = new FileReader();
    reader.onload = () => setAvatarSrc(reader.result);
    reader.readAsDataURL(file);

    // Upload avatar
    try {
      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, file);
      const downloadURL = await getDownloadURL(avatarRef);
      setAvatarSrc(downloadURL);
      setUserData((prev) => ({ ...prev, avatarUrl: downloadURL }));
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  const handleProfileSubmit = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          ...userData,
          avatarUrl: avatarSrc,
        },
        { merge: true }
      );
      navigate("/homepage");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
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

        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
        />
        <TextField id="email" label="Email" variant="outlined" value={userData.email} disabled />
        <BioInput handleSubmit={onSubmit} userbio={userData.bio} />
        <Stack spacing={2}>
          <TeamMatchAutocomplete
            handleSubmit={onSubmit}
            initialValueSkills={userData.skills}
            initialValueStrengths={userData.strengths}
          />
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
