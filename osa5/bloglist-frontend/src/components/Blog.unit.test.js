import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddNewBlogForm from './AddNewBlogForm'

test('initially correct content showing title author not url likes', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 5,
    user: { name: 'testUserName', username: 'testUserUsername' },
  }
  const user = {
    name: 'testUsername',
    username: 'testUserUsername',
  }
  const showIfOwnBlog = jest.fn()
  showIfOwnBlog.mockReturnValue(true)

  render(<Blog blog={blog} user={user} />)

  const div = screen.getByText('testTitle', { exact: false })
  expect(div).toBeDefined()
  expect(div).toHaveTextContent('testAuthor', { exact: false })

  const allInfo = screen.queryByText('testUrl', { exact: false })
  expect(allInfo).toHaveTextContent('5', { exact: false })
  expect(allInfo).toHaveStyle('display: none')
})

test('clicking button to show all shows url and likes', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 5,
    user: { name: 'testUserName', username: 'testUserUsername' },
  }
  const user = {
    name: 'testUsername',
    username: 'testUserUsername',
  }
  render(<Blog blog={blog} user={user} />)
  const userSetup = userEvent.setup()
  const button = screen.getByText('view')
  await userSetup.click(button)

  const allInfo = screen.queryByText('testUrl', { exact: false })
  expect(allInfo).toHaveTextContent('5', { exact: false })
  expect(allInfo).not.toHaveStyle('display: none')
})

test('clicking button to like twice  handler is called twice', async () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 5,
    user: { name: 'testUserName', username: 'testUserUsername' },
  }
  const user = {
    name: 'testUsername',
    username: 'testUserUsername',
  }
  const blogOld = {
    title: 'testTitleOld',
    author: 'testAuthorOld',
    url: 'testUrlOld',
    likes: 10,
    user: { name: 'testUserNameOld', username: 'testUserUsernameOld' },
  }
  const mockBlogs = [blogOld]
  const mockSetBlog = jest.fn()
  const mockHandleAddLike = jest.fn()

  jest.mock('../services/blogs')
  const mockBlogServices = require('../services/blogs')
  mockBlogServices.update = blog

  render(
    <Blog
      blog={blog}
      user={user}
      setBlogs={mockSetBlog}
      blogs={mockBlogs}
      addLike={mockHandleAddLike}
    />
  )

  const userSetup = userEvent.setup()
  const button = screen.getByText('like')

  await userSetup.click(button)
  await userSetup.click(button)

  expect(mockHandleAddLike.mock.calls.length).toBe(2)
})

test('calls with correct params when new blog is created', async () => {
  const mockAddBlog = jest.fn()
  render(<AddNewBlogForm addBlog={mockAddBlog} />)

  const userSetup = userEvent.setup()

  const inputs = screen.getAllByRole('textbox')
  await userSetup.type(inputs[0], 'testTitle')
  await userSetup.type(inputs[1], 'testAuthor')
  await userSetup.type(inputs[2], 'testUrl')

  const button = screen.getByText('create')
  await userSetup.click(button)

  expect(mockAddBlog.mock.calls[0][0].title).toBe('testTitle')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('testUrl')
})
