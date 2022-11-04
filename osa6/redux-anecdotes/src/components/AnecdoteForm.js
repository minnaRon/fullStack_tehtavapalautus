import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
      event.preventDefault()
      const anecdoteToAdd = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.createAnecdote(anecdoteToAdd)
      props.setNotification(`You added anecdote: ${anecdoteToAdd}`, 5)
    }

    return (
      <>
      <h2>create new</h2>
      <form onSubmit= {addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
      </>
    )
}

const mapDispatchToProps = { createAnecdote, setNotification }

export default connect(null, mapDispatchToProps)(AnecdoteForm)
 