import './SharedEvents.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as friendActions from '../../redux/friends';

export default function SharedEvents() {
    const { friendId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(friendActions.thunkSharedEvents(friendId))
    }, [dispatch, friendId])

    const events = useSelector(state=>state.friends.sharedEvents);
    let eventArr;

    if(events) { eventArr = Object.values({...events})}

    return (
        <div>
            {eventArr && eventArr.map(e=>(
                <div key={e.id}>
                    <h1>{e.title}</h1>
                </div>
            ))}
        </div>
    )
}