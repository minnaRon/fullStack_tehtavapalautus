import { useDispatch, useSelector } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { useParams } from "react-router-dom"
import { addLike } from '../reducers/blogReducer'

const Blog = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = useSelector(state => state.blogs.filter(blog => blog.id === id)[0])

  if (!blog) {
    return null
  }

  const showIfOwnBlog = { display: blog.user.username === user.username ? '' : 'none' }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        <div>
          likes {blog.likes}
          <button id='like-button' onClick={() => dispatch(addLike(blog))}>like</button>
        </div>
        added by {blog.user.name}<br />
        <div style={showIfOwnBlog} >
          <button onClick={() => dispatch(removeBlog(blog))}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
