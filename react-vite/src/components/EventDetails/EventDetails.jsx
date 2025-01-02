import { Link } from 'react-router-dom';

const EventDetails = ({ event }) => {

    let avgReaction = (rating) => {
        if (rating === 1) return 'assets/sad.png'

        if (rating === 2) return 'assets/meh.png'

        return 'assets/happy.png'
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