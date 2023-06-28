import { useState } from 'react';
import { createDiaryEntry } from '../services/diarySer';
import { DiariesProps, Weather, Visibility, DateState, WeatherState, VisibilityState, CommentState } from '../types';
import Notification from './Notification';

const InputDate = ({ date, setDate }: DateState) => {
  return (
    <label>
      date
      <input
        type='date'
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
    </label>
  );
};

const RadioWeatherTypes = ({ weather, setWeather }: WeatherState) => {
  const weatherTypes = Object.values(Weather);
  return (
    <div>
      weather
      {weatherTypes.map(w =>
        <label key={w}>
          <input
            type='radio'
            id={w}
            name='weather'
            value={weather}
            checked={w === weather}
            onChange={() => setWeather(w)}
          />
          {w}
        </label>
      )}
    </div>
  );
};

const RadioVisibilityTypes = ({ visibility, setVisibility }: VisibilityState) => {
  const visibilityTypes = Object.values(Visibility);
  return (
    <div>
      visibility
      {visibilityTypes.map(v =>
        <label key={v}>
          <input
            type='radio'
            id={v}
            name='visibility'
            value={visibility}
            checked={v === visibility}
            onChange={() => setVisibility(v)}
          />
          {v}
        </label>
      )}
    </div>
  );
};

const InputComment = ({ comment, setComment }: CommentState) => {
  return (
    <div>
      <label>
        comment
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </label>
    </div>
  );
};

const NewDiaryEntryForm = ({ diaries, setDiaries }: DiariesProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    createDiaryEntry({ date, visibility, weather, comment }).then(data => {
      setDiaries(diaries.concat(data));
    }).catch(error => {
      error.name && error.name === 'AxiosError'
        ? setErrorMessage(error.response.data)
        : setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')

      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })

    setDate(new Date().toISOString().split('T')[0]);
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} />
      <form onSubmit={diaryEntryCreation}>
        <InputDate date={date} setDate={setDate} />
        <RadioVisibilityTypes visibility={visibility} setVisibility={setVisibility} />
        <RadioWeatherTypes weather={weather} setWeather={setWeather} />
        <InputComment comment={comment} setComment={setComment} />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm
