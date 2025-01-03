import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TbMoodSadSquint } from "react-icons/tb";
import { BiHappy } from "react-icons/bi";
import { PiSmileyMeh } from "react-icons/pi";
import { singleEvent } from '../../redux/event';
import './EventDetails.css'
import { useEffect } from 'react';

const EventDetails = () => {

    const dispatch = useDispatch()

    const { eventId } = useParams()

    useEffect(() => {
        dispatch(singleEvent(eventId))
    }, [dispatch, eventId])

    const user = useSelector((state) => state.session.user)
    const events = useSelector((state) => state.session.events)
    const event = events[eventId]

    let avgReaction = (rating) => {
        if (rating === 1) return <TbMoodSadSquint className='sad-face'/>

        if (rating === 2) return <PiSmileyMeh className='meh-face'/>

        return <BiHappy className='happy-face'/>
    };

    const categories = event.categories.split(',');

    console.log('HERE ARE YOUR CATEGORIES --->',categories)

    return (
        <li key = {event.event.id}>
            <div className='li-event-details'>
                <Link to={ `/events/${event.id}` } /> {event.event.title}
                <img src={event.event.preview} alt={event.event.title} />
                <div className='li-event-categories'></div>
                    {categories.forEach(category => {
                        <li className='category'>
                            <p>{category}</p>
                        </li>
                    })}
                <div className='li-event-description'>
                    <p>{event.event.description}</p>
                    <h3>Location</h3>
                    <p>{event.event.address}</p>
                    <p>{event.event.city}</p>
                    <p>{event.event.state}</p>
                    <h3>Date and Time</h3>
                    <p>Date: {event.event.event_date}</p>
                    <p>Start Time: {event.event.start_time}</p>
                    <p>End Time: {event.event.end_time}</p>
                </div>
                <div className='li-event-attendees'>
                    {/* need rsvps reducer */}
                </div>
            </div>
            <div className='li-organizer-details'>
                <h2>{event.organizer.name}</h2>
                <div className='li-organizer-description'>
                    <p>{event.organizer}</p>
                    <div className='li-organizer-logo'></div>
                    <img src={event.organizer.logo} alt={event.organizer.name} />
                    <div className='li-organizer-contact'></div>
                    <p>{event.organizer.link}</p>
                    <p>{event.organizer.phone_number}</p>
                    <p>{event.organizer.email}</p>
                </div>
                <div className='li-organizer-feedback'>
                    <h3>Community Feedback: </h3>
                    {
                        event.avgFeedback?
                        <img src={avgReaction(event.avgFeedback)} alt={event.organizer.name} /> :
                        <p>Be the first to voice your feeback !</p>
                    }
                    <img src={avgReaction(event.avgFeedback)} alt={event.organizer.name} />
                </div>
            </div>
        </li>

    )
}

export default EventDetails