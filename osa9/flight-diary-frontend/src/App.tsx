import NewDiaryEntryForm from './components/NewDiaryEntryForm';
import DiaryEntryList from './components/DiaryEntryList';
import { getAllDiaryEntries } from './services/diarySer';
import { DiaryEntry } from './types.js';
import { useState, useEffect } from 'react';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <>
      <NewDiaryEntryForm diaries={diaries} setDiaries={setDiaries} />
      <DiaryEntryList diaries={diaries} />
    </>
  );
};

export default App;
