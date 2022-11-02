import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = [...useSelector(state => state.anecdotes)]
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted anecdote: '${anecdote.content}'`, 5))
  }
  const filter = useSelector(state => state.filter)
  return (
    <>
    {anecdotes
      .filter(a => a.content.includes(filter))
      .sort((a,b) => a.votes - b.votes)
      .reverse()
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList
