import React, { Fragment } from "react";
import FCAppBar from "../components/FCAppBar";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <Fragment>
      <FCAppBar />
      <Box sx={{ mt: "5rem" }} className="elegant-container">
        <Card className="elegant-card">
          <CardContent>
            <Typography variant="h1" className="team-title">
              Browse Teams
            </Typography>
            <Stack>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis excepturi sed
                quis eaque impedit pariatur corrupti dignissimos autem id necessitatibus!
              </p>

              <Link to="/selectteams">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: "1.5rem", mx: "auto" }}
                  className="event-title"
                  endIcon={<ArrowRightAltIcon />}
                >
                  Browse Teams
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: "1.5rem" }} className="elegant-container">
        <Card className="elegant-card">
          <CardContent>
            <Typography variant="h1" className="team-title">
              Create Teams
            </Typography>
            <Stack>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis excepturi sed
                quis eaque impedit pariatur corrupti dignissimos autem id necessitatibus!
              </p>
              <Link to="/floatnewteam">
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: "1.5rem", mx: "auto" }}
                  className="event-title"
                  endIcon={<ArrowRightAltIcon />}
                >
                  Create a Team
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
}
