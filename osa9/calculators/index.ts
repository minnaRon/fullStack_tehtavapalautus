import express from 'express';
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;
  if (height && weight && !isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = {
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight))
    };
    return res.status(200).json(result);
  }
  return res.status(400).json({error: "malformatted parameters"});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!daily_exercises || !target || !daily_exercises[0]) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  const dailyHours: number[] = daily_exercises.map((h: any) => Number(h));

  if (dailyHours.includes(NaN) || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyHours, Number(target));

  return res.status(200).json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
