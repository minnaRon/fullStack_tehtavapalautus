import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs, user, addLike }) =>  {
  const [showAll, setShowAll] = useState(false)
  
  const showInfo = {display: showAll ? '' : 'none'}
  const showIfOwnBlog = {display: blog.user.username === user.username ? '' : 'none'}

  const buttonLabel = showAll ? 'hide' : 'view'

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }}

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(!showAll)}>{buttonLabel}</button>
      <div style={showInfo}>
        {blog.url} <br/>
        <div>
          likes {blog.likes}
          <button id='like-button' onClick={() => addLike(blog)}>like</button> 
        </div>
        {blog.user.name}<br/>
        <div style={showIfOwnBlog} >
          <button onClick= {() => removeBlog()}>remove</button>
        </div>              
      </div>
    </div>  
  )}

export default Blog
