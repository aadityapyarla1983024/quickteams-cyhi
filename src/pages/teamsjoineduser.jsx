import React from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Divider } from "@mui/material";

export default function MyTeamsPage() {
  // Example data (replace with Firestore query for user's teams)
  const myTeams = [
    {
      id: "team1",
      name: "Hackathon Avengers",
      eventKey: "hack2025",
      description: "Building AI-powered productivity tools.",
      status: "present", // "present" or "past"
    },
    {
      id: "team2",
      name: "Code Ninjas",
      eventKey: "mlfest2024",
      description: "Focused on deep learning research.",
      status: "past",
    },
    {
      id: "team3",
      name: "Design Sprint Crew",
      eventKey: "uiuxjam2025",
      description: "Prototyping apps with Figma + React.",
      status: "present",
    },
  ];

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: "5%" }}>
      <Typography variant="h5" gutterBottom>
        My Teams
      </Typography>

      <Stack spacing={2}>
        {myTeams.map((team) => (
          <Card key={team.id} sx={{ borderRadius: 1, boxShadow: 3 }}>
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
                  label={team.status === "present" ? "Present" : "Past"}
                  color={team.status === "present" ? "success" : "default"}
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
        ))}
      </Stack>
    </Box>
  );
}
