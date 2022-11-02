import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification(state, action) {
			return action.payload
		},
	}
})
export const {showNotification} = notificationSlice.actions

export const setNotification = (message, timeout) => {
	return async dispatch => {
		dispatch(showNotification(message))
		setTimeout(() =>
			dispatch(showNotification(null)),
			timeout*1000
		)
	}
}

export default notificationSlice.reducer
