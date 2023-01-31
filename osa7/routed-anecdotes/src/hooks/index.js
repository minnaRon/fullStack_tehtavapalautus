import {useState} from 'react'

export const useField = (type) => {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setName(event.target.name)
        setValue(event.target.value)
    }
    
    const reset = () => {
        setName('')
        setValue('')
    }

    return {
        type,
        name,
        value,
        onChange,
        reset
    }
}
