import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../redux/event';
import './ListEvents.css'
import { useEffect } from 'react';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';

const ListEvents = () => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.session.events)
    // const upcomingEvents = useSelector((state) => state.session.upcoming)

    const eventTiles = (events) => {events.map((event)=>{
        <li key = {event.id}>
            <div className='li-event-list'>
                <Link to={ `/events/${event.id}` } > {event.title}
                <img src={event.preview} alt={event.title} />
                <div className='li-event-categories'></div>
                    {event.categories.split(',').forEach(category => {
                        <li className='category'>
                            <p>{category}</p>
                        </li>
                    })}
                <div className='li-event-description'>
                    <h2>{event.city}, {event.state}</h2>
                    <h3>Date: {event.event_date}</h3>
                    <h3>Start Time: {event.start_time}</h3>
                    <h3>End Time: {event.end_time}</h3>
                    {/* <p>{event.description}</p> */}
                </div>
                </Link>
            </div>
        </li>
    })}

    return (
        <>
        <div className='event-list-container'>
        <ul className='event-list'>
            {eventTiles(events)}
        </ul>
        </div>
        {
            user?
            <UpcomingEvents user={user} /> :
            ''
        }
        </>
    )
}

export default ListEvents;