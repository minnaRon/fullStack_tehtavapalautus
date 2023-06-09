import {gql} from '@apollo/client'

export const LOGIN = gql`
  mutation login($username:String!, $password:String!) {
    login(
      username: $username
      password: $password
      ){
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($author:String, $genre:String){
    allBooks(author:$author, genre: $genre) {
      title
      author{
        name
        id
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title:String!, $author:String, $published:Int, $genres:[String!]) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
      ){
      title
      author {
        name
        id
      }
      published
      genres
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded { 
      title
      author {
        name
        id
      }
      published
      genres
    }  
  }
`

export const ADD_BIRTHYEAR = gql`
  mutation add_birthyear($name:String!, $born:Int) {
    editAuthor(
      name:$name
      born:$born
      ){
        name
        born
        bookCount
        id
    }
  }
`
