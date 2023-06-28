export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export type TimePeriod = {
  startDate: string;
  endDate: string;
};

export interface Discharge {
  date: string;
  criteria: string;
}

export type Healthcare = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

interface OccupationalHealhcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: TimePeriod;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealhcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
