import { HealthAndSafety, Work } from "@mui/icons-material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface HospitalEntryProps {
  type: string | undefined;
}

function HospitalEntry({ type }: HospitalEntryProps) {
  if (type === "Hospital") {
    return (
      <span>
        <LocalHospitalIcon />
      </span>
    );
  } else if (type === "HealthCheck") {
    return (
      <span>
        <HealthAndSafety />
      </span>
    );
  } else if (type === "OccupationalHealthcare") {
    return (
      <span>
        <Work />
      </span>
    );
  }
}

export default HospitalEntry;
