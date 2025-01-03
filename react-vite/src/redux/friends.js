import { csrfFetch } from "./csrf";

const GET_FRIENDS = 'friends/getFriends';

const getFriends = (payload) => ({
    type: GET_FRIENDS,
    payload
});

export const thunkAllFriends = () => async dispatch => {
    const res = await csrfFetch("/api/friends");
    
    if (res.ok) {
        const friends = await res.json();
        if(friends.errors) { return; }

        dispatch(getFriends(friends))
    }
}

const initialState = { allFriends: {} };

export default function friendReducer(state = initialState, action) {
    switch (action.type){
        case GET_FRIENDS:{
            const newState = { ...state, allFriends: {} };
            const friendsArray = action.payload.friends;
            friendsArray.forEach((friend) => {
                newState.allFriends[friend.id] = friend;
            });
            return newState
        }
        default:
            return state;
    }
}

