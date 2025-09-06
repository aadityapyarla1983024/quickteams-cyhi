import React from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function JoinTeamButton({ teamId }) {
  const { user } = useAuth();
  const handleJoinTeam = async () => {
    const teamRef = doc(db, "teams", teamId);
    await updateDoc(teamRef, {
      pendingRequests: arrayUnion(user.uid),
    });
  };
  return (
    <Button onClick={handleJoinTeam} variant="contained" color="error">
      Request to Join
    </Button>
  );
}
