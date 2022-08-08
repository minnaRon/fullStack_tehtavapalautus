import { useState, useEffect } from 'react'
import personService from './services/Persons'


const Filter = ({newSubstring, handleSubstringChange}) => 
  <div>
    filter shown with 
    <input value={newSubstring} onChange={handleSubstringChange} />
  </div>


const PersonForm = ({addPerson, handleChange, newName, newNumber}) =>
  <form onSubmit={addPerson}>
    <div>
      name: 
      <input name='name' value={newName} onChange={handleChange}/>
    </div>
    <div>
      number: 
      <input name='number' value={newNumber} onChange={handleChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>


const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom:10
  }

  if (message && message.includes('error:')) {
    notificationStyle.color = 'red'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}


const Person = ({ person, removePerson }) =>
  <p> 
    {person.name} {person.number}
    <button onClick={removePerson}>delete</button>
  </p>


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Martin Fowler')
  const [newNumber, setNewNumber] = useState('+234 23-3344')
  const [newSubstring, setNewSubstring] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }, []) 
  
  const handlePerson = (event) => {
    event.preventDefault()
    
    const existingPersonInfo = persons.filter(person => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase())
    
      if (existingPersonInfo[0] && existingPersonInfo[0].number === newNumber) {
      alert(`${newName} is already added to phonebook`)
    } else if (existingPersonInfo[0]) {
      changeNumber(existingPersonInfo[0])
    } else {
      addPerson()
    }
  }

  const changeNumber = (existingPersonInfo) => {
    personService
      .replace(existingPersonInfo, newNumber)
      .then(updatedPerson => {
        let newPersons = [...persons]
        newPersons.forEach(
          person => person.id === updatedPerson.id 
          ? person.number = updatedPerson.number 
          : person.number = person.number
          )
        setPersons(newPersons)
        
        setMessage(`${updatedPerson.name} has now new phonenumber: ${updatedPerson.number}`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)

      }).catch(error => {
        setErrorMessage(`error: Information of ${existingPersonInfo.name} has already been removed from server`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 4000)
        setPersons(persons.filter(person => person.id !== existingPersonInfo.id))
      })
  }

  const addPerson = () => {  
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('Ada')
          setNewNumber('speed dial 1')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
          setMessage(null)
          }, 2000)
        })
  }

  const remove = person => {
    const confirmation = window.confirm(`Delete ${person.name} ?`)

    if (confirmation) {
      personService
        .remove(person.id)
        .then(returnedStatus => {
          if (returnedStatus === 200) {
            setPersons(persons.filter(x => x.id !== person.id))
            setMessage(`Deleted ${person.name}`)
            setTimeout(() => {
            setMessage(null)
            }, 4000)
          }
        })
    }
  }

  const selectedPersons = () => 
    persons.filter(person => 
      person.name.toLowerCase().includes(newSubstring.toLowerCase())
  )

  const handleSubstringChange = (event) => {
    setNewSubstring(event.target.value)
  }

  const handleChange = (event) => {
    event.target.name === 'name' 
      ? setNewName(event.target.value) 
      : setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Notification message={errorMessage} />
      <Filter newSubstring={newSubstring} handleSubstringChange={handleSubstringChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={handlePerson} handleChange={handleChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <div>
        {selectedPersons().map(person =>
          <Person key={person.id} person={person} removePerson={() => remove(person)} />
        )}
      </div>
    </div>
  )
}

export default App
