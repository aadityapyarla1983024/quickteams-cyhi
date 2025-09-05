import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@mui/icons-material";
import { skillsList, strengthsList } from "../components/skillsandstrengths.js"; // <-- use your export

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function TeamMatchAutocomplete({ handleSubmit }) {
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedStrengths, setSelectedStrengths] = React.useState([]);
  console.log(skillsList, strengthsList);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        mx: "auto",
        mt: 4,
        // p: 3,
        borderRadius: 2,
        // subtle card over your gradient background
        // background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
      }}
    >
      <Stack spacing={3}>
        {/* Skills multi-autocomplete */}
        <Autocomplete
          multiple
          options={skillsList}
          disableCloseOnSelect
          value={selectedSkills}
          onChange={(event, newValue) => {
            setSelectedSkills(newValue);
            handleSubmit("skills", selectedSkills);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <ListItemText primary={option} />
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="filled"
                label={option}
                {...getTagProps({ index })}
                sx={{ fontWeight: 500 }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skills"
              placeholder="Select skills (multiple)"
              variant="outlined"
              size="medium"
            />
          )}
        />

        {/* Strengths multi-autocomplete */}
        <Autocomplete
          multiple
          options={strengthsList}
          disableCloseOnSelect
          value={selectedStrengths}
          onChange={(event, newValue) => {
            setSelectedStrengths(newValue);
            handleSubmit("strengths", selectedStrengths);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <ListItemText primary={option} />
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                sx={{ fontWeight: 500 }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Strengths"
              placeholder="Select strengths (multiple)"
              variant="outlined"
              size="medium"
            />
          )}
        />

        {/* simple debug / preview — remove in production */}
        <Box sx={{ color: "text.secondary", fontSize: 13 }}>
          Selected skills: {selectedSkills.length ? selectedSkills.join(", ") : "—"}
          <br />
          Selected strengths: {selectedStrengths.length ? selectedStrengths.join(", ") : "—"}
        </Box>
      </Stack>
    </Box>
  );
}
