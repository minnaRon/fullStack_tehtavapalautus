import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PatientInfo from './PatientInfo';
import PatientEntries from './PatientEntries';
import patientService from '../../services/patients';
import { Patient } from '../../types';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    const getPatient = async () => {
      setPatient(id ? await patientService.getOne(id) : undefined)
    };
    getPatient();
  }, [id]);

  if (patient) {
    return (
      <div>
        <PatientInfo patient={patient} />
        <PatientEntries patient={patient} />
      </div>
    );
  }
  return <p>Patient information missing</p>;
};

export default PatientPage;
