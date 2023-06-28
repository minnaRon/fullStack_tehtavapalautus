import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, NonSensitivePatientEntry, NewPatient } from '../types';
 
const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
  ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, findById, addPatient };
