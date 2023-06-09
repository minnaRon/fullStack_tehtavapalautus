import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const result = useQuery(ALL_BOOKS, {
    variables: {genre:genre},
  })

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks

  if (!genres[0]) {
    const allGenres = books.map(b => b.genres).flat()
    setGenres(Array.from(new Set(allGenres)))
  }

  return (
    <div>
      <h2>books</h2>
      {
      genre 
      ? <p>in genre <b>{genre}</b>:</p>
      :null
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Choose a genre:</h4>
      <button onClick={()=> setGenre(null)}>all</button>
      {genres.map(genre => 
        <button key={genre} onClick={()=> setGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books
