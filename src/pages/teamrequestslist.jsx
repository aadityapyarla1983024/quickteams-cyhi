import React from "react";
import { Box, Card, CardContent, Typography, Stack, IconButton, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
export default function TeamRequestsPage() {
  const requests = [
    {
      id: "req1",
      userName: "Alice Johnson",
      description: "Frontend Developer skilled in React & TypeScript",
    },
    {
      id: "req2",
      userName: "Ravi Kumar",
      description: "Backend Node.js & MongoDB, loves system design",
    },
    {
      id: "req3",
      userName: "Sophia Lee",
      description: "UI/UX Designer with Figma expertise",
    },
  ];

  const handleAccept = (id) => {
    console.log("Accepted request:", id);
    // TODO: Firestore update
  };

  const handleReject = (id) => {
    console.log("Rejected request:", id);
    // TODO: Firestore update
  };

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: "5%" }}>
      <Typography variant="h2" gutterBottom>
        Team Join Requests
      </Typography>

      <Stack spacing={2}>
        {requests.map((req) => (
          <Card key={req.id} sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {req.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {req.description}
                  </Typography>
                </Box>

                <Stack direction="column" spacing={1}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleAccept(req.id)}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() => handleReject(req.id)}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
            <Divider />
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
