import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addOneBlog(state, action) {
            return [...state, action.payload]
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlog(state, action) {
            console.log('--updated-state-', state, '--action--', action);
            const updatedBlog = action.payload
            return state.map(b => b.id !== updatedBlog.id ? b : updatedBlog)
        },
        removeOneBlog(state, action) {
            console.log('-removeblog-state--', state, '--action--', action);
            const blogToRemove = action.payload
            return state.filter(b => b.id !== blogToRemove.id)
        }
    }
})
export const { addOneBlog, setBlogs, updateBlog, removeOneBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const addBlog = (blogObject, user) => {
    return async dispatch => {
        const returnedBlog = await blogService.create(blogObject)
        returnedBlog.user = user
        dispatch(addOneBlog(returnedBlog))
        dispatch(showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`))
    }
}

export const addLike = (blog) => {
    console.log('--like-blog-', blog);
    return async dispatch => {
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
        console.log('--updatedblog--', updatedBlog);
        dispatch(updateBlog(updatedBlog))
        dispatch(showNotification(`like added to '${updatedBlog.title}' by ${updatedBlog.author}`))
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        const confirm = await window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (confirm) {
            await blogService.remove(blog.id)
            dispatch(removeOneBlog(blog))
        }
    }
}

export default blogSlice.reducer
