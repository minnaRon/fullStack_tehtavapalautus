import { useState, useEffect } from 'react'
import diagnosisService from '../../services/diagnosisSer';
import { Patient, Diagnosis, Entry } from '../../types';
import { IconsHealthCheckRating, IconsHealthcareType } from '../mui/icons';

interface Props {
  patient: Patient
  setPatient?: React.Dispatch<React.SetStateAction<Patient>>
}

interface PropsPatientEntry {
  entry: Entry
  diagnosisName?: (code: string) => string
}

const EntryBasicInfo = ({ entry }: PropsPatientEntry) => {
  return (
    <div>
      {entry.date} {IconsHealthcareType[entry.type]}
      {entry.type === 'OccupationalHealthcare'
        ? <span>{entry.employerName}</span>
        : ''
      }<br />
      <i>{entry.description}</i><br />
      {entry.type === 'HealthCheck'
        ? <span>{IconsHealthCheckRating(entry.healthCheckRating)}<br /></span>
        : ''
      }
      diagnose by {entry.specialist}
    </div>
  );
};

const EntryDiagnosis = ({ entry, diagnosisName }: PropsPatientEntry) => {
  return (
    <div>
      {entry.diagnosisCodes ?
        <ul>
          {entry.diagnosisCodes.map(c =>
            <li key={c}>{c} {diagnosisName ? diagnosisName(c) : ''} </li>
          )}
        </ul>
        : null
      }
    </div>
  );
};

const HealthCheck = ({ entry, diagnosisName }: PropsPatientEntry) => {
  if (entry.type === 'HealthCheck') {
    return (
      <div>
        <hr />
        <EntryBasicInfo entry={entry} />
        <EntryDiagnosis entry={entry} diagnosisName={diagnosisName} />
        <hr />
      </div>
    );
  }
  return null;
};

const Hospital = ({ entry, diagnosisName }: PropsPatientEntry) => {
  if (entry.type === 'Hospital') {
    return (
      <div>
        <hr />
        <EntryBasicInfo entry={entry} />
        <EntryDiagnosis entry={entry} diagnosisName={diagnosisName} />
        <p>
          discharged {entry.discharge.date} {entry.discharge.criteria}
        </p>
        <hr />
      </div>
    );
  }
  return null;
};

const OccupationalHealthcare = ({ entry, diagnosisName }: PropsPatientEntry) => {
  if (entry.type === 'OccupationalHealthcare') {
    return (
      <div>
        <hr />
        <EntryBasicInfo entry={entry} />
        <EntryDiagnosis entry={entry} diagnosisName={diagnosisName} />
        <p>
          {entry.sickLeave ? `sick leave: ${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}` : ''}
        </p>
        <hr />
      </div>
    );
  }
  return null;
};

const assertNever = (value: never): never => {
  throw new Error(`Argument of type '${JSON.stringify(value)}' is not assignable to parameter of type 'never.`);
};

const EntryDetails = ({ entry, diagnosisName }: PropsPatientEntry) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnosisName={diagnosisName} />;
    case 'Hospital':
      return <Hospital entry={entry} diagnosisName={diagnosisName} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnosisName={diagnosisName} />;
    default:
      return assertNever(entry);
  }
};

const PatientEntries = ({ patient }: Props) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };
    void fetchDiagnosis();
  }, []);

  if (!patient.entries[0]) {
    return null;
  }

  const diagnosisName = (code: string) => {
    const diagnosisOfPatient = diagnosis.find(d => d.code === code);
    return diagnosisOfPatient ? diagnosisOfPatient.name : '';
  };

  return (
    <div>
      <h3>entries</h3>
      {
        patient.entries.map(e => {
          return (
            <div key={e.id}>
              <EntryDetails entry={e} diagnosisName={diagnosisName} />
            </div>
          );
        })
      }
    </div>
  );
};

export default PatientEntries;
