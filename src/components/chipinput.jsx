import React from "react";
import { Chip, TextField, Stack, Button, Box } from "@mui/material";

export default function ChipInput({ name, handleSubmit }) {
  const [chips, setChips] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleAddChip = () => {
    if (inputValue.trim() !== "" && !chips.includes(inputValue.trim())) {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteChip = (chipToDelete) => () => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          label={name}
          placeholder={`Type a new ${name.slice(0, -1)}`}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            handleSubmit(String(name).toLowerCase(), chips);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddChip();
            }
          }}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddChip}>
          Add
        </Button>
      </Stack>

      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onDelete={handleDeleteChip(chip)} />
        ))}
      </Box>
    </Box>
  );
}
