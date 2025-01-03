import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import for redirection
import {
	fetchEventById,
	createNewGroup,
	// inviteFriendToGroup,
	// removeFriendFromGroup,
} from '../../redux/group';
import './GroupPage.css';

const GroupComponent = ({ eventId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Hook for navigation
	const { event, invitedFriends } = useSelector((state) => state.group);

	// Local state for group creation
	const [description, setDescription] = useState('');

	// Fetch event details when the component mounts
	useEffect(() => {
		dispatch(fetchEventById(eventId));
	}, [dispatch, eventId]);

	// Handle "Save Group" (POST request to create a group)
	const handleSaveGroup = async () => {
		const groupData = {
			eventId,
			invitedFriends: invitedFriends.map((friend) => friend.id),
		};

		const result = await dispatch(createNewGroup(groupData));
		if (result) {
			// Redirect to the events index after successful creation
			navigate('/events');
		}
	};

	return (
		<div className='group-component'>
			<h2>{event?.name}</h2>
			<p>
				{event?.date} | {event?.time} | {event?.category}
			</p>
			<p>{event?.location}</p>
			<a href={`/events/${eventId}`}>Link to event page</a>

			{/* Group Description */}
			<section className='group-description'>
				<label htmlFor='description'>Add group description:</label>
				<textarea
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Add group description here...'
				/>
				<button className='save-group-button' onClick={handleSaveGroup}>
					Save Group
				</button>
			</section>
		</div>
	);
};

export default GroupComponent;
