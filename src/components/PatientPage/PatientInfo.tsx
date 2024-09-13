import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patients from "../../services/patients";
import { Patient } from "../../types";
import { Box, Card, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryComponent from "./EntryComponent";

function PatientInfo() {
  const [patient, setPatient] = useState<Patient | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const match = useMatch("/patients/:id");
  const patientId = match?.params.id;

  useEffect(() => {
    async function initializePatient(patientId: string | undefined) {
      try {
        const patient = await patients.getPatientData(patientId);
        setPatient(patient);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
    initializePatient(patientId);
  }, []);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(patient.entries);

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
              <EntryComponent key={entry.id} entry={entry} />
            ))}
          </Box>
        </Card>
      )}
    </>
  );
}

export default PatientInfo;
