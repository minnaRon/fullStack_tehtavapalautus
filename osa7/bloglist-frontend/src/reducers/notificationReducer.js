import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})
export const { setNotification } = notificationSlice.actions

let timeoutId = null
export const showNotification = (message, type = 'info', time = 3) => {
    return dispatch => {
        dispatch(setNotification({ message, type }))
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            dispatch(setNotification(null))
        }, time * 1000)
    }
}

export default notificationSlice.reducer
