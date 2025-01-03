import './Friends.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as friendActions from '../../redux/friends';

function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(friendActions.thunkAllFriends())
    }, [dispatch])

    const friends = useSelector(state=>state.friends.allFriends);
    let friendsArr;

    if(friends) {
        friendsArr = Object.values({...friends})
    }

    return (
        <div>
            {friendsArr && friendsArr.map(friend=>(
                <div key={friend.id}>
                    <span>{friend.first_name}</span>
                </div>
            ))}
        </div>
    )
}

export default Friends;