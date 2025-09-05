import React, { Fragment } from "react";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import "./TeamCardStyles.css";
import { Button } from "@mui/material";
import FCAppBar from "../components/FCAppBar";

const team = {
  title: "Team Alpha",
  event: "Hackathon 2025",
  venue: "Online",
  date: "2025-10-10",
  place: "Virtual Room 1",
  members: 3,
  maxMembers: 5,
  skills: ["React", "Firebase", "UI/UX"],
  strengths: ["Teamwork", "Problem Solving"],
};

export default function TeamSelectPage() {
  return (
    <Fragment>
      <FCAppBar />
      <Box className="elegant-container">
        <Card className="elegant-card">
          <CardContent>
            <Typography variant="h1" className="team-title">
              {team.title}
            </Typography>
            <Typography variant="h5" className="event-title">
              {team.event}
            </Typography>

            <Stack spacing={1} mt={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="primary" />
                <Typography variant="subtitle1">
                  {team.venue} - {team.place}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayIcon color="primary" />
                <Typography variant="subtitle1">{team.date}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PeopleIcon color="primary" />
                <Typography variant="subtitle1">
                  Members: {team.members}/{team.maxMembers}
                </Typography>
              </Stack>
            </Stack>

            <Box mt={3}>
              <Typography variant="subtitle2" className="chip-label">
                Skills Required:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {team.skills.map((skill) => (
                  <Chip
                    sx={{ color: "black", backgroundColor: "#cccccc" }}
                    key={skill}
                    label={skill}
                    className="chip-skill"
                  />
                ))}
              </Stack>
            </Box>

            <Box mt={2}>
              <Typography variant="subtitle2" className="chip-label">
                Strengths Required:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {team.strengths.map((strength) => (
                  <Chip
                    sx={{ color: "black", backgroundColor: "#cccccc" }}
                    key={strength}
                    label={strength}
                    className="chip-strength"
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Stack
        spacing={3}
        direction="row"
        sx={{ display: "flex", justifyContent: "center", width: "90%", my: "2rem", mx: "auto" }}
      >
        <Button size="large" color="warning" variant="contained">
          Next
        </Button>
        <Button size="large" color="error" variant="contained">
          Join Team
        </Button>
      </Stack>
    </Fragment>
  );
}
