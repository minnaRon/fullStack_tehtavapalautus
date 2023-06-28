import express from 'express';
const app = express();

import cors from 'cors';
import diaryRouter from './routes/diaries';
app.use(express.json());

const options = {
  origin: 'http://localhost:3005',
};

app.use(cors(options));

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
