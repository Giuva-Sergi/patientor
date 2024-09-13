import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patients from "../../services/patients";

export const usePatientData = () => {
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

  return { patient, isLoading, error };
};
