import { Patient } from '../../types';
import { IconsGender } from '../mui/icons';

interface Props {
  patient: Patient
  setPatient?: React.Dispatch<React.SetStateAction<Patient>>
}

const PatientInfo = ({ patient }: Props) => {
  return (
    <div>
      <h2>{patient.name} {IconsGender[patient.gender]}</h2>
      <p>
        ssh: {patient.ssn}<br />
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientInfo;
