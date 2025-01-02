import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentUser, fetchUserEvents } from '../services/userService';

// Thunks to fetch data
export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	fetchCurrentUser
);
export const fetchUserEventsData = createAsyncThunk(
	'user/fetchUserEvents',
	fetchUserEvents
);

// Slice
const userSlice = createSlice({
	name: 'user',
	initialState: {
		profile: null,
		events: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.profile = action.payload.user;
				state.status = 'succeeded';
			})
			.addCase(fetchUserEventsData.fulfilled, (state, action) => {
				state.events = action.payload.events;
				state.status = 'succeeded';
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
