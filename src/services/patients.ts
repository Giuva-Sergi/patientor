import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatientData = async (patientId: string | undefined) => {
  if (!patientId) {
    throw new Error("Patient ID not provided");
  }
  try {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${patientId}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.error;
      throw new Error(errorMessage);
    } else {
      throw new Error("unknown error");
    }
  }
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export default {
  getAll,
  create,
  getPatientData,
};
