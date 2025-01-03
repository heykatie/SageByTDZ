import { csrfFetch } from "./csrf";

const GET_FRIENDS = 'friends/getFriends';
const SINGLE_FRIEND = 'friends/singleFriend';

const getFriends = (payload) => ({
    type: GET_FRIENDS,
    payload
});

const getSingleFriend = (payload) => ({
    type: SINGLE_FRIEND,
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

export const thunkSingleFriend = (friendId) => async dispatch => {
    const res = await csrfFetch(`/api/friends/${friendId}`);

    if(res.ok) {
        const friend = await res.json();
        if(friend.errors) { return; }

        dispatch(getSingleFriend(friend))
    }
}

const initialState = { allFriends: {}, friend: {} };

export default function friendReducer(state = initialState, action) {
    switch (action.type){
        case GET_FRIENDS: {
            const newState = { ...state, allFriends: {} };
            const friendsArray = action.payload.friends;
            friendsArray.forEach((friend) => {
                newState.allFriends[friend.id] = friend;
            });
            return newState
        }
        case SINGLE_FRIEND: {
            const newState = { ...state, friend: {} };
            const friend = action.payload;
            friend.forEach((friend) => {
                newState.friend[friend.id] = friend;
            })
            return newState
        }
        default:
            return state;
    }
}

