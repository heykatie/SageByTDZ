import { csrfFetch } from './csrf';

// Action Types
const SET_GROUP = 'group/setGroup';
const REMOVE_GROUP = 'group/removeGroup';

// Action Creators
const setGroup = (group) => ({
	type: SET_GROUP,
	payload: group,
});

const removeGroup = () => ({
	type: REMOVE_GROUP,
});

// Thunk Actions

// Fetch Group by Event ID
export const thunkFetchGroup = (eventId) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${eventId}`);
	if (response.ok) {
		const groupData = await response.json();
		dispatch(setGroup(groupData));
	}
};

// Create a New Group
export const thunkCreateGroup = (groupData) => async (dispatch) => {
	const response = await csrfFetch('/api/groups', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(groupData),
	});

	if (response.ok) {
		const newGroup = await response.json();
		dispatch(setGroup(newGroup));
		return newGroup;
	} else if (response.status < 500) {
		const errorMessages = await response.json();
		return errorMessages;
	} else {
		return { server: 'Something went wrong. Please try again' };
	}
};

// Delete a Group
export const thunkDeleteGroup = (groupId) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${groupId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(removeGroup());
	}
};

// Initial State
const initialState = { group: null };

// Reducer
function groupReducer(state = initialState, action) {
	switch (action.type) {
		case SET_GROUP:
			return { ...state, group: action.payload };
		case REMOVE_GROUP:
			return { ...state, group: null };
		default:
			return state;
	}
}

export default groupReducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { csrfFetch } from './csrf';

// // Thunks

// export const createNewGroup = createAsyncThunk(
// 	'group/createNewGroup',
// 	async (groupData) => {
// 		const response = await csrfFetch('/api/groups', {
// 			method: 'POST',
// 			headers: { 'Content-Type': 'application/json' },
// 			body: JSON.stringify(groupData),
// 		});
// 		if (!response.ok) throw new Error('Failed to create group');
// 		return response.json();
// 	}
// );

// export const fetchEventById = createAsyncThunk(
// 	'group/fetchEventById',
// 	async (eventId) => {
// 		const response = await csrfFetch(`/api/events/${eventId}`);
// 		if (!response.ok) throw new Error('Failed to fetch event');
// 		return response.json();
// 	}
// );

// export const inviteFriendToGroup = createAsyncThunk(
// 	'group/inviteFriendToGroup',
// 	async ({ eventId, friendId }) => {
// 		const response = await csrfFetch(`/api/invites/create`, {
// 			method: 'POST',
// 			body: JSON.stringify({ friendId }),
// 		});
// 		if (!response.ok) throw new Error('Failed to send invite');
// 		return response.json();
// 	}
// );

// export const updateGroupDescription = createAsyncThunk(
// 	'group/updateGroupDescription',
// 	async ({ eventId, description }) => {
// 		const response = await csrfFetch(`/api/groups/${eventId}`, {
// 			method: 'PUT',
// 			body: JSON.stringify({ description }),
// 		});
// 		if (!response.ok) throw new Error('Failed to update description');
// 		return response.json();
// 	}
// );

// // Initial State
// // const initialState = {
// // 	event: null,
// // 	friends: [],
// // 	invitedFriends: [],
// // 	status: 'idle',
// // 	error: null,
// // };

// // Slice
// const groupSlice = createSlice({
// 	name: 'group',
// 	initialState: {
// 		event: null,
// 		invitedFriends: [],
// 		status: 'idle',
// 		error: null,
// 	},
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder.addCase(createNewGroup.fulfilled, (state, action) => {
// 			// Reset state after creating the group
// 			state.event = null;
// 			state.invitedFriends = [];
// 		});
// 	},
// });

// export default groupSlice.reducer;
