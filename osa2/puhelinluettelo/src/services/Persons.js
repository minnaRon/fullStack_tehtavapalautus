import axios from 'axios'

//const baseUrl = 'http://localhost:3001/persons'
//yhdistämismuutos
//const baseUrl = 'http://localhost:3001/api/persons'
//yhdistämismuutos herokuun
//const baseUrl = 'https://fs-phonebook-15082022.herokuapp.com/api/persons'
//yhdistämismuutos suhteelliseksi, kun front ja back samassa osoitteessa
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.status)
}

const replace = (person, newNumber) => {
  const request = axios.put(`${baseUrl}/${person.id}`, { 'name': person.name, 'number': newNumber } )
  return request.then(response => response.data)
}

export default { getAll, create, remove, replace }
