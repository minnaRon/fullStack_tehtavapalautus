import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const changedAnecdoteObject = action.payload
      return state.map(a => 
        a.id !== changedAnecdoteObject.id ? a : changedAnecdoteObject
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  },
})

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdoteToVote => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.addVote({...anecdoteToVote, votes: anecdoteToVote.votes +1})
    dispatch(addVote(changedAnecdote))
  }
}

export default anecdoteSlice.reducer
