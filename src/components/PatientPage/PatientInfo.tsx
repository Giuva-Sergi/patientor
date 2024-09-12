import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patients from "../../services/patients";
import { Patient } from "../../types";
import { Box, Card, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

function PatientInfo() {
  const [patient, setPatient] = useState<Patient | null>();
  const [isLoading, setIsLoading] = useState(true);
  const match = useMatch("/patients/:id");
  const patientId: string | undefined = match?.params.id;

  useEffect(() => {
    async function initializePatient(patientId: string | undefined) {
      const patient = await patients.getPatientData(patientId);
      setPatient(patient);
      setIsLoading(false);
    }
    initializePatient(patientId);
  }, []);

  console.log(patient);

  if (isLoading) return <div>loading...</div>;

  return (
    <Card
      sx={{
        width: "70ch",
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
    </Card>
  );
}

export default PatientInfo;
