import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Entry } from "../../types";

interface EntryProps {
  entry: Entry;
  codesNames: Array<string>;
}

function EntryComponent({ entry, codesNames }: EntryProps) {
  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>
        {entry.date}
        <Typography component="span" sx={{ fontStyle: "italic" }}>
          {entry.description}
        </Typography>
      </Typography>
      <List>
        {entry.diagnosisCodes?.map((code, i) => (
          <ListItem key={code}>
            <ListItemText>{code}</ListItemText>
            <ListItemText>{codesNames.at(i)}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default EntryComponent;
