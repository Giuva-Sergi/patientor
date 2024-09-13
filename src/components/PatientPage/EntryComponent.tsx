import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Entry } from "../../types";

interface EntryProps {
  entry: Entry;
}

function EntryComponent({ entry }: EntryProps) {
  console.log(entry);

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>
        {entry.date}
        <Typography component="span" sx={{ fontStyle: "italic" }}>
          {entry.description}
        </Typography>
      </Typography>
      <List>
        {entry.diagnosisCodes?.map((code) => (
          <ListItem key={code}>
            <ListItemText>{code}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default EntryComponent;
