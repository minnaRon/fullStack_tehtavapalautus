import {useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import {ALL_AUTHORS, ADD_BIRTHYEAR} from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  
  const [ addBirthyear ] = useMutation(ADD_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  if (!props.show) {
    return null
  }
  
  if(result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    addBirthyear({  variables: { name, born } })
    setName('')
    setBorn('')
  }

  const authorOptions = authors.map(a => {
    return (
      <option key={a.name} value={a.name}>{a.name}</option>
    )
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { 
      props.token ?
      <form onSubmit={submit}>
        <h3>Set birthyear</h3>
        <select onChange={({ target }) => setName(target.value)}>
          {authorOptions}
        </select>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
      :null
      }
    </div>
  )
}

export default Authors
