import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Box, Typography, Stack, Card, CardContent, Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MyTeamsPage() {
  const { user } = useAuth();
  const [myTeams, setMyTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyTeams() {
      if (!user) return;
      const q = query(collection(db, "teams"), where("memberIds", "array-contains", user.uid));
      const snapshot = await getDocs(q);
      const teams = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMyTeams(teams);
    }
    fetchMyTeams();
  }, [user]);

  // Helper to determine status based on event date
  const getStatus = (team) => {
    if (!team.date) return "Past"; // If no date, treat as Past
    let eventDate;

    if (team.date.toDate) {
      // Firestore Timestamp
      eventDate = team.date.toDate();
    } else {
      // Date stored as string or JS Date
      eventDate = new Date(team.date);
    }

    const now = new Date();
    // If event date < today’s date, mark as past; else present
    return eventDate < now ? "Past" : "Present";
  };

  // Handler for clicking a team card
  const handleCardClick = (teamId) => {
    navigate(`/teamdetails/${teamId}`);
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: "5%" }}>
      <Typography variant="h5" gutterBottom>
        My Teams
      </Typography>

      <Stack spacing={2}>
        {myTeams.map((team) => {
          const status = getStatus(team);
          return (
            <Card
              key={team.id}
              sx={{ borderRadius: 1, boxShadow: 3, cursor: "pointer" }}
              onClick={() => handleCardClick(team.id)}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  {/* Left side (team info) */}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {team.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Event: {team.eventKey}
                    </Typography>
                    <Typography variant="body2">{team.description}</Typography>
                  </Box>

                  {/* Right side (status) */}
                  <Chip
                    label={status}
                    color={status === "Present" ? "success" : "default"}
                    variant="outlined"
                    sx={{
                      fontSize: "1rem",
                      height: 40,
                      px: 2,
                      borderRadius: 2,
                    }}
                  />
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
