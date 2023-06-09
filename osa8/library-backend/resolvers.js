const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments({}),
    authorCount: async () => Author.collection.countDocuments({}),
    allBooks: async (root, args) => {
      const {author, genre} = args
      let filters ={}
      if (author) {
       const authorWanted =  await Author.findOne({name: author})
       filters = {...filters, author:authorWanted._id}
      }
      if (genre) {
       filters = {...filters, genres: {$all:[genre]}}
      }
      return await Book.find(filters).populate('author')
    },     
    allAuthors: async () => {
     return await Author.find({})
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
      try {
        user.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})
      if( !user || args.password !== 'secret') {
        throw new GraphQlError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT'}
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      let author = await Author.findOne({name: args.author})
      if (!author) {
        author = new Author({name: args.author})
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }
      const book = new Book({...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      author.books = [...author.books, book._id]
      try {
        const newAuthor = await Author.findByIdAndUpdate(
          author._id, {...author}, {new: true}
          )
      } catch (error) {
        throw new GraphQLError('Saving book for author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }      
      let author = await Author.findOne({name: args.name})
      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    }
  }, 
  Author: {
    bookCount: async (root) => {
      const findUsingBooks = async () => {
        const books = await Book.find({author: root._id})
        return books.length
      }
      
      const author = await Author.findById(root._id)
      return author.books.length
      console.log('bookcount author', author.books.length, await findUsingBooks())
      //return author.books.length > 0 ? author.books.length : await findUsingBooks()
  }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
}

module.exports = resolvers
