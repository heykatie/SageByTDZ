import './SingleFriend.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as friendActions from '../../redux/friends';

export default function SingleFriend() {
    const { friendId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(friendActions.thunkSingleFriend(friendId))
    }, [dispatch, friendId])

    const friend = useSelector(state=>state.friends.friend);
    let friendArr;

    if(friend) { friendArr = Object.values({...friend})}

    return (
        <div>
            {friendArr && friendArr.map(f=>(
                <div key={f.id}>
                    <h1>{f.first_name}</h1>
                </div>
            ))}
        </div>
    )
}