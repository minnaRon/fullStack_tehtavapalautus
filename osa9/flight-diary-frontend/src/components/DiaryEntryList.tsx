import { DiaryEntry } from '../types';

const DiaryEntryList = (props: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h2>Diary entries</h2>
      <ul>
        {props.diaries.map(d => <li key={d.id}>
          <h3>{d.date}</h3>
          <p>
            visibility: {d.visibility}<br />
            weather: {d.weather}<br />
            {d.comment ? <span>comment: {d.comment}</span> : null}
          </p>
        </li>)}
      </ul>
    </>
  );
};

export default DiaryEntryList;
