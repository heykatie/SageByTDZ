import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserEvents } from '../../redux/user';
import './CreateGroupModal.css';
import { useNavigate } from 'react-router-dom';

const CreateGroupModal = ({ onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Add navigate for routing
	const { events, status } = useSelector((state) => state.user);
	const [selectedEventId, setSelectedEventId] = useState('');

	// Fetch user's events when modal mounts
	useEffect(() => {
		dispatch(fetchUserEvents());
	}, [dispatch]);

	// Handle event selection
	const handleEventChange = (e) => {
		setSelectedEventId(e.target.value);
	};

	// Handle "Invite Friends" button to go to group form page
	const handleInviteFriends = () => {
		if (!selectedEventId) {
			alert('Please select an event before continuing.');
			return;
		}
		navigate(`/groups/new`);
		onClose(); // Close the modal after navigating
	};

	// Close modal on "X" button click
	const handleCloseClick = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<div className='create-group-modal'>
			<div className='modal-content'>
				{/* Top-right "X" button to close the modal */}
				<button className='close-x-button' onClick={handleCloseClick}>
					&times;
				</button>
				<h2>Create Group</h2>
				<div className='event-selection'>
					<label htmlFor='event-select'>Select Event:</label>
					<select
						id='event-select'
						value={selectedEventId}
						onChange={handleEventChange}
						required>
						<option value='' disabled>
							Select an event
						</option>
						{status === 'loading' ? (
							<option>Loading events...</option>
						) : (
							events.map((event) => (
								<option key={event.id} value={event.id}>
									{event.title} - {event.event_date} ({event.city},{' '}
									{event.state})
								</option>
							))
						)}
					</select>
				</div>
				<div className='modal-buttons'>
					<button className='invite-button' onClick={handleInviteFriends}>
						Create Group!
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateGroupModal;
