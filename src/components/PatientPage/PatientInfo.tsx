import { Box, Card, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryComponent from "./EntryComponent";
import { usePatientData } from "./usePatientData";
import { useDiagnoses } from "./useDiagnoses";

function PatientInfo() {
  const { patient, isLoading, error } = usePatientData();
  const { diagnosesArray: diagnoses } = useDiagnoses();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  const codesEntries =
    patient.entries.reduce((acc, currEntry) => {
      if (currEntry.diagnosisCodes) {
        acc.push(...currEntry.diagnosisCodes);
        return acc;
      }
    }, []) || [];

  const codesNames = codesEntries.map(
    (code) => diagnoses.find((d) => d.code === code)?.name
  );

  return (
    <>
      {patient && (
        <Card
          sx={{
            width: "70%",
            padding: 4,
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginInline: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <Typography variant="h3">{patient.name}</Typography>
            {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
          </Box>
          <Box sx={{ mt: 10 }}>
            <Typography>ssn: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Entries
            </Typography>
            {patient.entries.map((entry) => (
              <EntryComponent
                key={entry.id}
                entry={entry}
                codesNames={codesNames}
              />
            ))}
          </Box>
        </Card>
      )}
    </>
  );
}

export default PatientInfo;
