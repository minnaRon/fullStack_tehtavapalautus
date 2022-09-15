import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddNewBlogForm from './components/AddNewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='info') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    returnedBlog.user = user
    setBlogs(blogs.concat(returnedBlog))
    notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
  }

  const handleAddLike = async (blog) => {
    const updatedObject = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    id: blog.id
  }
  const updatedBlog = await blogService.update(blog.id, updatedObject)
  updatedBlog.user = blog.user
  setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog)) 
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification notification={notification} />
        <LoginForm 
          handleLogin={handleLogin} 
          setUsername={setUsername} 
          setPassword={setPassword}
          />
      </div>
    )
  }
    
  return (
    <div>
      <h2>blogs</h2>
      
      <Notification notification={notification} />
      <div>
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >  
        <AddNewBlogForm addBlog={addBlog} user={user} />
      </Togglable>     
      </div>
      <div>
        {blogs
          .sort((a,b) => a.likes - b.likes)
          .reverse()
          .map(blog =>
            <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} blogs={blogs} addLike={() => handleAddLike(blog)}/>
          )
        }
      </div> 
    </div>
  )
}

export default App
