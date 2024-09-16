import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Entry } from "../../types";
import HospitalEntry from "./EntryType";

interface EntryProps {
  entry: Entry;
  codesNames: Array<string>;
}

function assertNever(value: never) {
  throw new Error("Entry type not found: " + value);
}

function EntryComponent({ entry, codesNames }: EntryProps) {
  function checkEntry(entry: Entry) {
    switch (entry.type) {
      case "Hospital":
        return "Hospital";
      case "HealthCheck":
        return "HealthCheck";
      case "OccupationalHealthcare":
        return "OccupationalHealthcare";
      default:
        assertNever(entry);
    }
  }

  const entryType = checkEntry(entry);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Typography sx={{ fontWeight: "bold" }}>{entry.date}</Typography>
        <HospitalEntry type={entryType} />
      </Box>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      <List>
        {entry.diagnosisCodes?.map((code, i) => (
          <ListItem key={code}>
            <ListItemText>{code}</ListItemText>
            <ListItemText>{codesNames.at(i)}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Typography>diagnose by {entry.specialist}</Typography>
    </Box>
  );
}

export default EntryComponent;
