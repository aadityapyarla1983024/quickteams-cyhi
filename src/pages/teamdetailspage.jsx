import React, { Fragment } from "react";
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
import FCAppBar from "../components/FCAppBar";

const team = {
  title: "Hackathon Masters",
  description: "A passionate team building cool hackathon projects.",
  type: "fulltime",
  maxUsers: 5,
  venue: { mode: "offline", address: "123 Innovation Street, Tech City" },
  skills: ["React", "Node.js", "MongoDB"],
  strengths: ["Problem Solving", "UI/UX", "Teamwork"],
  members: [
    { id: 1, name: "Alice", avatar: "" },
    { id: 2, name: "Bob", avatar: "" },
    { id: 3, name: "Charlie", avatar: "" },
  ],
};

export default function TeamDetailsPage() {
  return (
    <Fragment>
      <FCAppBar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          px: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            borderRadius: 1,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            background: "linear-gradient(135deg, #1e1e2f 0%, #2a2a40 100%)",
            color: "white",
          }}
        >
          <CardContent>
            {/* Title */}
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {team.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)" }} gutterBottom>
              {team.description}
            </Typography>

            {/* Details */}
            <Stack spacing={2} mt={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <WorkHistoryIcon color="info" />
                <Typography>{team.type === "fulltime" ? "Full-time" : "Part-time"}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="info" />
                <Typography>
                  {team.venue.mode === "online" ? "Online" : `Offline - ${team.venue.address}`}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PeopleIcon color="info" />
                <Typography>Max Members: {team.maxUsers}</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

            {/* Skills */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {team.skills.map((skill) => (
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

            {/* Strengths */}
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Strengths
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {team.strengths.map((strength) => (
                  <Chip
                    key={strength}
                    label={strength}
                    sx={{
                      fontSize: "0.95rem",
                      height: 38,
                      px: 2,
                      borderRadius: 2,
                      backgroundColor: "#ff9800",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

            {/* Members */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <Stack direction="row" spacing={3} mt={2} flexWrap="wrap">
                {team.members.map((member) => (
                  <Stack
                    key={member.id}
                    alignItems="center"
                    spacing={1}
                    sx={{
                      width: 100,
                      p: 2,
                      borderRadius: 3,
                    }}
                  >
                    <Avatar sx={{ width: 60, height: 60 }} src={member.avatar} />
                    <Typography variant="body2">{member.name}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Buttons */}
      <Stack
        spacing={3}
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          my: 4,
        }}
      >
        <Button
          size="large"
          color="info"
          variant="contained"
          sx={{
            px: 4,
            py: 1,
            fontSize: "1rem",
            borderRadius: 3,
            textTransform: "none",
          }}
        >
          Edit Team
        </Button>
        <Button
          size="large"
          color="error"
          variant="contained"
          sx={{
            px: 4,
            py: 1,
            fontSize: "1rem",
            borderRadius: 3,
            textTransform: "none",
          }}
        >
          Leave Team
        </Button>
      </Stack>
    </Fragment>
  );
}
