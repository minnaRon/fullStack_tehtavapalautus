import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBlog } from '../reducers/blogReducer'

const AddNewBlogForm = ({ user, blogFormRef }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const dispatch = useDispatch()

  const addNewBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    dispatch(addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }, user))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddNewBlogForm
