import { csrfFetch } from './csrf';

const SET_GROUP = 'group/setGroup';
const REMOVE_GROUP = 'group/removeGroup';

const setGroup = (group) => ({
	type: SET_GROUP,
	payload: group,
});

const removeGroup = () => ({
	type: REMOVE_GROUP,
});

export const thunkFetchGroup = (groupId) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${groupId}`);
	if (response.ok) {
		const group = await response.json();
		dispatch(setGroup(group));
	}
};

export const thunkCreateGroup = (groupData) => async (dispatch) => {
	const response = await csrfFetch('/api/groups', {
		method: 'POST',
		body: JSON.stringify(groupData),
	});
	if (response.ok) {
		const newGroup = await response.json();
		dispatch(setGroup(newGroup));
	}
};

// Update Group
export const thunkUpdateGroup = (groupData) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${groupData.groupId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(groupData),
	});
	if (response.ok) {
		const updatedGroup = await response.json();
		dispatch(setGroup(updatedGroup));
	}
};

// Delete Group
export const thunkDeleteGroup = (groupId) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${groupId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		dispatch(removeGroup());
	}
};

const initialState = { group: null };

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
