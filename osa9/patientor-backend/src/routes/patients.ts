import express from 'express';
import toNewPatientEntry from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  patient
    ? res.status(200).json(patient)
    : res.status(404);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.status(204).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
