import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { HealthCheckRating } from '../../types';

export const IconsGender = {
  female: <FemaleIcon />,
  male: <MaleIcon />,
  other: <TransgenderIcon />
};

export const IconsHealthcareType = {
  Hospital: <LocalHospitalIcon />,
  HealthCheck: <MedicalInformationIcon />,
  OccupationalHealthcare: <WorkIcon />
};

export const IconsHealthCheckRating = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: 'green' }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: 'yellow' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: 'red' }} />;
    case HealthCheckRating.CriticalRisk:
      return <HeartBrokenIcon style={{ color: 'red' }} />;
    default:
      break;
  }
};
