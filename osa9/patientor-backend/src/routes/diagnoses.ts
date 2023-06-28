import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(diagnoseService.getEntries());
});

export default router;
