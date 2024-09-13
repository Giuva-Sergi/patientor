import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import diagnoses from "../../services/diagnoses";

export const useDiagnoses = () => {
  const [diagnosesArray, setDiagnosesArray] = useState<Diagnosis[]>([]);

  useEffect(() => {
    async function initializeDiagnoses() {
      const data = await diagnoses.getDiagnoses();
      setDiagnosesArray(data);
    }

    initializeDiagnoses();
  }, []);

  return { diagnosesArray };
};
