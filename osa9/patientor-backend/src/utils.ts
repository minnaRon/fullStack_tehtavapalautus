import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};


const parseObjectFieldValueIntoString = (field: unknown): string => {
  if (!isString(field)) {
    throw new Error(`Incorrect field value to parse into string, field value: ${field}`);
  }
  return field;
};

const parseObjectFieldValueIntoDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect date`);
  }
  return date;
};

const parseObjectFieldValueIntoGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect gender`);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatient = {
      name: parseObjectFieldValueIntoString(object.name),
      dateOfBirth: parseObjectFieldValueIntoDate(object.dateOfBirth),
      ssn: parseObjectFieldValueIntoString(object.ssn),
      gender: parseObjectFieldValueIntoGender(object.gender),
      occupation: parseObjectFieldValueIntoString(object.occupation),
      entries: []
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;
