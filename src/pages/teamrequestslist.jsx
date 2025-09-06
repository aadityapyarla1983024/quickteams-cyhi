import React, { Fragment, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { Box, Card, CardContent, Typography, Stack, Button, Divider } from "@mui/material";

export default function TeamRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      // Fetch teams created/joined by current user
      const teamsSnap = await getDocs(
        query(collection(db, "teams"), where("memberIds", "array-contains", user.uid))
      );
      const requestsArr = [];
      for (const teamDoc of teamsSnap.docs) {
        const pending = teamDoc.data().pendingRequests || [];
        for (const reqUid of pending) {
          // Optionally, fetch user profile info for requests
          requestsArr.push({ teamId: teamDoc.id, userId: reqUid, team: teamDoc.data() });
        }
      }
      setRequests(requestsArr);
    }
    fetchRequests();
  }, [user]);

  const handleAccept = async (teamId, userId) => {
    const teamRef = doc(db, "teams", teamId);
    await updateDoc(teamRef, {
      memberIds: arrayUnion(userId),
      pendingRequests: arrayRemove(userId),
    });
  };

  const handleReject = async (teamId, userId) => {
    const teamRef = doc(db, "teams", teamId);
    await updateDoc(teamRef, {
      pendingRequests: arrayRemove(userId),
    });
  };

  // UI unchanged (map over requests state)
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
