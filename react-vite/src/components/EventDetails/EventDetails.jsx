// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TbMoodSadSquint } from "react-icons/tb";
import { BiHappy } from "react-icons/bi";
import { PiSmileyMeh } from "react-icons/pi";
import { singleEvent, addOrgFeedback } from '../../redux/event';
import './EventDetails.css'
import { useEffect } from 'react';

const EventDetails = () => {

    const dispatch = useDispatch()

    const { eventId } = useParams()

    useEffect(() => {
        dispatch(singleEvent(eventId))
    }, [dispatch, eventId])

    // const user = useSelector((state) => state.session.user)
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
        <>
        <div className='event-details-container'>
            <h1>{event.event.title}</h1>
            <div className='li-event-preview'>
                <img src={event.event.preview} alt={event.event.title} />
            </div>
                <div className='li-event-categories'>
                    {categories.forEach(category => {
                        <li className='category'>
                            <p>{category}</p>
                        </li>
                    })}
            </div>
            <div className='li-event-description'>
                <p>{event.event.description}</p>
                <h2>Location</h2>
                <h3>{event.event.address}</h3>
                <h3>{event.event.city}</h3>
                <h3>{event.event.state}</h3>
                <h2>Date and Time</h2>
                <h3>Date: {event.event.event_date}</h3>
                <h3>Start Time: {event.event.start_time}</h3>
                <h3>End Time: {event.event.end_time}</h3>
            </div>
            <div className='li-event-attendees'>
                {/* need rsvps reducer */}
            </div>
            <div className='li-event-rsvp'>
                {/* need rsvps reducer */}
            </div>
            <div className='li-event-invite'>
                {/* need invites reducer */}
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
                {
                    user?
                    <FeedbackRatingInput /> :
                    <Link to={'/login'}>Log In</Link>
                }
            </div>
        </div>
        </>

    )
}

export default EventDetails