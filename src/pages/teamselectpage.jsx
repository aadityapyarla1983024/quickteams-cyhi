import React, { Fragment, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Stack, Chip, Button } from "@mui/material";
import { db, auth } from "../firebase";
import { collection, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import FCAppBar from "../components/FCAppBar";

export default function TeamSelectPage() {
  const [teams, setTeams] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTeams() {
      const snapshot = await getDocs(collection(db, "teams"));
      setTeams(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchTeams();
  }, []);

  const currentUser = auth.currentUser;

  // Filter out teams created by current user
  const filteredTeams = teams.filter((team) => team.createdBy !== currentUser?.uid);

  const currentTeam = filteredTeams[currentIndex];

  // Helper to check if user is already a member
  const isUserMember = () => {
    if (!currentUser || !currentTeam) return false;
    return currentTeam.memberIds?.includes(currentUser.uid);
  };

  // Helper to check if max members reached
  const maxReached = () => {
    if (!currentTeam) return false;
    return (
      currentTeam.maxMembers !== undefined &&
      currentTeam.members !== undefined &&
      currentTeam.members >= currentTeam.maxMembers
    );
  };

  const handleJoinTeam = async (teamId) => {
    if (!currentUser) {
      alert("Please login to join a team");
      return;
    }

    if (isUserMember()) {
      alert("You have already joined this team");
      return;
    }

    if (maxReached()) {
      alert("This team is already full");
      return;
    }

    const teamRef = doc(db, "teams", teamId);

    try {
      await updateDoc(teamRef, {
        memberIds: arrayUnion(currentUser.uid),
      });

      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === teamId
            ? {
                ...team,
                members: (team.members ?? 0) + 1,
                memberIds: team.memberIds
                  ? [...team.memberIds, currentUser.uid]
                  : [currentUser.uid],
              }
            : team
        )
      );
    } catch (error) {
      console.error("Error joining team:", error);
      alert("Failed to join the team");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      filteredTeams.length ? (prevIndex + 1) % filteredTeams.length : 0
    );
  };

  if (!currentTeam) {
    return (
      <Fragment>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Typography variant="h5" color="textSecondary">
            Loading teams or no teams available.
          </Typography>
        </Box>
      </Fragment>
    );
  }

  const showJoinButton = !maxReached() && !isUserMember();

  return (
    <Fragment>
      <FCAppBar />
      <Box sx={{ width: "90%", mx: "auto", mt: "20%" }} className="elegant-container">
        <Card sx={{ p: "2rem 3rem" }} className="elegant-card">
          <CardContent>
            <Typography variant="h1" className="team-title">
              {currentTeam.name ?? "Untitled Team"}
            </Typography>
            <Typography variant="h5" className="event-title">
              Event: {currentTeam.eventKey ?? "No event description"}
            </Typography>

            <Stack spacing={1} mt={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="primary" />
                <Typography variant="subtitle1">
                  {currentTeam.venue?.mode === "online"
                    ? "Online"
                    : `Offline - ${
                        currentTeam.venue?.address ?? currentTeam.place ?? "Unknown location"
                      }`}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayIcon color="primary" />
                <Typography variant="subtitle1">
                  {currentTeam.date
                    ? currentTeam.date.toDate
                      ? currentTeam.date.toDate().toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : new Date(currentTeam.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                    : "Date not specified"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PeopleIcon color="primary" />
                <Typography variant="subtitle1">
                  Members: {currentTeam.members ?? 0} / {currentTeam.maxMembers ?? "N/A"}
                </Typography>
              </Stack>
            </Stack>

            <Box mt={3}>
              <Typography variant="subtitle2" className="chip-label">
                Skills Required:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {(currentTeam.skillsRequired ?? []).map((skill) => (
                  <Chip
                    key={skill}
                    sx={{ color: "black", backgroundColor: "#cccccc" }}
                    label={skill}
                  />
                ))}
              </Stack>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle2" className="chip-label">
                Strengths Required:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {(currentTeam.strengthsRequired ?? []).map((strength) => (
                  <Chip
                    key={strength}
                    sx={{ color: "black", backgroundColor: "#cccccc" }}
                    label={strength}
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Stack spacing={3} direction="row" sx={{ mt: 3, justifyContent: "center" }}>
        <Button size="large" color="warning" variant="contained" onClick={handleNext}>
          Next
        </Button>
        {showJoinButton && (
          <Button
            size="large"
            color="error"
            variant="contained"
            onClick={() => handleJoinTeam(currentTeam.id)}
          >
            Join Team
          </Button>
        )}
      </Stack>
    </Fragment>
  );
}
