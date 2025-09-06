import React, { Fragment, useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

export default function TeamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsersByIds(memberIds) {
    if (!memberIds || memberIds.length === 0) return [];
    const userDocs = await Promise.all(memberIds.map((uid) => getDoc(doc(db, "users", uid))));
    return userDocs.filter((d) => d.exists()).map((d) => ({ uid: d.id, ...d.data() }));
  }

  useEffect(() => {
    async function fetchTeamAndMembers() {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "teams", id));
        if (!snap.exists()) {
          setTeam(null);
          setMembers([]);
          setLoading(false);
          return;
        }
        const teamData = { id, ...snap.data() };
        setTeam(teamData);
        if (teamData.memberIds?.length > 0) {
          const users = await fetchUsersByIds(teamData.memberIds);
          setMembers(users);
        } else {
          setMembers([]);
        }
      } catch (error) {
        console.error("Failed to fetch team or members:", error);
        setTeam(null);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTeamAndMembers();
  }, [id]);

  const currentUser = auth.currentUser;
  const isMember = currentUser && team?.memberIds?.includes(currentUser.uid);

  const handleLeaveTeam = async () => {
    if (!currentUser) {
      alert("Please login to leave the team.");
      return;
    }
    if (!team?.memberIds || !team.memberIds.includes(currentUser.uid)) {
      alert("You are not a member of this team.");
      return;
    }

    const updatedMemberIds = team.memberIds.filter((uid) => uid !== currentUser.uid);

    try {
      if (updatedMemberIds.length === 0) {
        await deleteDoc(doc(db, "teams", id));
        alert("You left and the team was deleted because it has no members.");
        navigate("/");
      } else {
        await updateDoc(doc(db, "teams", id), { memberIds: updatedMemberIds });
        setTeam((prev) => ({ ...prev, memberIds: updatedMemberIds }));
        setMembers((prev) => prev.filter((m) => m.uid !== currentUser.uid));
        alert("You have left the team.");
      }
    } catch (error) {
      console.error("Failed to leave team:", error);
      alert("Error occurred while leaving the team.");
    }
  };

  if (loading) {
    return (
      <Fragment>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Typography variant="h5" color="textSecondary">
            Loading team details...
          </Typography>
        </Box>
      </Fragment>
    );
  }

  if (!team) {
    return (
      <Fragment>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Typography variant="h5" color="error">
            Team not found.
          </Typography>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5, px: 3 }}>
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            borderRadius: 1,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            background: "linear-gradient(135deg, #1e1e2f 0%, #2a2a40 100%)",
            color: "white",
            px: 2,
            py: 1,
          }}
        >
          <CardContent>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              {team.name ?? "Untitled Team"}
            </Typography>
            <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)" }} gutterBottom>
              Event: {team.eventKey ?? "No event key specified."}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)" }} gutterBottom>
              {team.description ?? "No description available."}
            </Typography>

            <Stack spacing={2} mt={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <WorkHistoryIcon color="info" />
                <Typography>{team.type === "fulltime" ? "Full-time" : "Part-time"}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="info" />
                <Typography>
                  {team.mode === "online"
                    ? "Online"
                    : `Offline - ${team.venue ?? "Unknown address"}`}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PeopleIcon color="info" />
                <Typography>Max Members: {team.maxMembers ?? "N/A"}</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                Skills Required
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {(team.skillsRequired ?? []).map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{
                      fontSize: "0.95rem",
                      height: 38,
                      px: 2,
                      borderRadius: 2,
                      backgroundColor: "#00bcd4",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Strengths Required
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {(team.strengthsRequired ?? []).map((strength) => (
                  <Chip
                    key={strength}
                    label={strength}
                    sx={{
                      fontSize: "0.95rem",
                      height: 38,
                      px: 2,
                      borderRadius: 2,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

            <Box>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <Stack direction="row" spacing={3} mt={2} flexWrap="wrap" gap={3}>
                {members.length > 0 ? (
                  members.map((member) => (
                    <Stack
                      key={member.uid}
                      alignItems="center"
                      spacing={1}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                      }}
                    >
                      <Avatar sx={{ width: 60, height: 60 }} src={member.avatarUrl ?? ""}>
                        {!member.avatarUrl && member.name?.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{member.name ?? "Unknown"}</Typography>
                    </Stack>
                  ))
                ) : (
                  <Typography>No members found.</Typography>
                )}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ my: 3, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/editteam/${id}`)}
          sx={{ mr: 2 }}
        >
          Edit Team
        </Button>
        {isMember && (
          <Button variant="outlined" color="error" onClick={handleLeaveTeam}>
            Leave Team
          </Button>
        )}
      </Box>
    </Fragment>
  );
}
