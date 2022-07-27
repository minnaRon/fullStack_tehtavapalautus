import { useState } from 'react'

const Headline = ({text}) => (
  <h2>{text}</h2>
)

const Line = ({textStart, value, textEnd}) => (
  <div>{textStart} {value} {textEnd}</div>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const changeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <>
    <Headline text='Anecdote of the day' />
    <Line value={anecdotes[selected]} />
    <Line textStart='has' value={points[selected]} textEnd='votes' />
    <Button handleClick={vote} text='vote' />
    <Button handleClick={changeAnecdote} text='next anecdote' />
    <Headline text='Anecdote with most votes' />
    <Line value={anecdotes[points.indexOf(Math.max(...points))]} />
    </>
  )
}

export default App
