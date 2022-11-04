import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: [null, -1],
	reducers: {
		showNotification(state, action) {
			state = [...state, state[0]=action.payload]
		},
		setTimeoutID(state, action) {
			clearTimeout(state[1])
		 	state = [...state, state[1]=action.payload]
		}
	}
})

export const {showNotification, setTimeoutID} = notificationSlice.actions

export const setNotification = (message, timeout) => {
	return async dispatch => {
		dispatch(showNotification(message))
		const timeoutID = setTimeout(() =>
			dispatch(showNotification(null)),
			timeout*1000
		)
		dispatch(setTimeoutID(timeoutID))
	}
}

export default notificationSlice.reducer
