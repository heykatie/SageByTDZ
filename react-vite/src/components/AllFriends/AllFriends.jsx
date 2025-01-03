import './AllFriends.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as friendActions from '../../redux/friends';

export default function AllFriends() {
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
                    <Link to={`/friends/${friend.id}`}>
                    {friend.first_name}
                    </Link>
                </div>
            ))}
        </div>
    )
}
