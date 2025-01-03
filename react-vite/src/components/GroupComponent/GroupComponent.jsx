import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	thunkFetchGroup,
	thunkCreateGroup,
	thunkUpdateGroup,
	thunkDeleteGroup,
} from '../../redux/group';
import { fetchUserEvents, fetchUserFriends } from '../../redux/user'; // Fetch friends too
import './GroupComponent.css';

const GroupComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { groupId } = useParams();
	const { group, loading, error } = useSelector((state) => state.group);
	const { events, friends } = useSelector((state) => state.user);
	const [description, setDescription] = useState('');
	const [selectedFriends, setSelectedFriends] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const isEditMode = !!groupId;
	const { user } = useSelector((state) => state.session);

	// Fetch events and friends when the component mounts
	useEffect(() => {
		dispatch(fetchUserEvents());
		console.log('USER', user)
		dispatch(fetchUserFriends()); // Fetch friends list
		console.log('friends after fetch')
		if (isEditMode) {
			dispatch(thunkFetchGroup(groupId));
		} else {
			setDescription('');
			setSelectedFriends([]);
		}
	}, [dispatch, groupId, isEditMode,user]);

	// Prefill form when editing
	useEffect(() => {
		if (group && isEditMode) {
			setDescription(group.description || '');
			setSelectedFriends(group.invitedFriends || []);
		}
	}, [group, isEditMode]);

	const selectedEvent = events.find((event) => event.id === group?.event_id);

	// Save group (create or update)
	const handleSaveGroup = async (e) => {
		e.preventDefault();
		const groupData = {
			description,
			eventId: selectedEvent?.id || null, // Ensure eventId is correct
			friends: selectedFriends,
		};

		if (!groupData.eventId) {
			alert('Please select an event before saving the group.');
			return;
		}

		if (isEditMode) {
			await dispatch(thunkUpdateGroup({ ...groupData, groupId }));
		} else {
			await dispatch(thunkCreateGroup(groupData));
		}
		navigate('/events');
	};

	// Delete group
	const handleDeleteGroup = async () => {
		await dispatch(thunkDeleteGroup(groupId));
		navigate('/dashboard');
	};

	// Toggle friend selection
	const toggleFriendSelection = (friend) => {
		setSelectedFriends((prev) =>
			prev.includes(friend)
				? prev.filter((f) => f !== friend)
				: [...prev, friend]
		);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className='group-form-page'>
			{/* Event Information */}
			<h2>{selectedEvent?.title || 'Chosen Event Name'}</h2>
			<p>
				{selectedEvent?.event_date || 'Event Date'} |{' '}
				{selectedEvent?.start_time || 'Event Time'} |{' '}
				{selectedEvent?.categories || 'Event Category'}
			</p>
			<p>{selectedEvent?.address || 'Event Location'}</p>
			<a href={`/events/${selectedEvent?.id}`} className='event-link'>
				Link to event page
			</a>

			{/* Group Description */}
			<div className='group-description'>
				<label htmlFor='description'>Add group description:</label>
				<textarea
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</div>

			{/* Friends Selection */}
			<section className='friends-section'>
				<h3>Invite Friends!</h3>
				<div className='friends-list'>
					{friends.length ? (
						friends.map((friend) => (
							<div className='friend-item' key={friend.id}>
								<img
									src={friend.profile_pic}
									alt={`${friend.first_name}'s profile`}
									className='friend-profile-pic'
								/>
								<span>{`${friend.first_name} ${friend.last_name}`}</span>
								<button
									className={`select-friend-button ${
										selectedFriends.includes(friend) ? 'selected' : ''
									}`}
									onClick={() => toggleFriendSelection(friend)}>
									{selectedFriends.includes(friend) ? 'Remove' : 'Add'}
								</button>
							</div>
						))
					) : (
						<p>No friends to display. Invite friends to connect!</p>
					)}
				</div>
			</section>

			{/* Save and Delete Buttons */}
			<div className='group-buttons'>
				<button className='save-group-button' onClick={handleSaveGroup}>
					Save Group
				</button>
				{isEditMode && (
					<button
						className='delete-group-button'
						onClick={() => setShowDeleteModal(true)}>
						Delete Group
					</button>
				)}
			</div>

			{/* Delete Modal */}
			{showDeleteModal && (
				<div className='delete-modal'>
					<div className='delete-modal-content'>
						<p>Are you sure you want to delete this group?</p>
						<div className='modal-buttons'>
							<button
								className='confirm-delete'
								onClick={handleDeleteGroup}>
								Yes, Delete
							</button>
							<button
								className='cancel-delete'
								onClick={() => setShowDeleteModal(false)}>
								No, Go Back
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GroupComponent;
