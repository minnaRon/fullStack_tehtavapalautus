import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import AddNewBlogForm from './components/AddNewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/allUsersReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = [...useSelector(state => state.blogs)]

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const blogStyle = {
    listStyle: '',
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>

        <Notification />
        <div>
          <p>
            {user.name} logged in <br />
            <button onClick={() => handleLogout()}>logout</button>
          </p>

          <Routes>
            <Route path='/' element={
              <div>
                <Togglable buttonLabel='new blog' ref={blogFormRef} >
                  <AddNewBlogForm user={user} blogFormRef={blogFormRef} />
                </Togglable>
                {blogs
                  .sort((a, b) => a.likes - b.likes)
                  .reverse()
                  .map(blog =>
                    <div key={blog.id} style={blogStyle} >
                      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                    </div>
                  )}
              </div>
            } />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
