import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	thunkFetchGroup,
	thunkCreateGroup,
	thunkUpdateGroup,
	thunkDeleteGroup,
} from '../../redux/group';
import { fetchUserEvents } from '../../redux/user';
import './GroupComponent.css';

const GroupComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { groupId } = useParams(); // Get groupId from URL for editing
	const { group, loading, error } = useSelector((state) => state.group);
	const { events } = useSelector((state) => state.user);
	const [description, setDescription] = useState('');
	const [selectedFriends, setSelectedFriends] = useState([]); // Track selected friends
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const isEditMode = !!groupId;

	// Fetch the events and group data
	useEffect(() => {
		dispatch(fetchUserEvents());
		if (isEditMode) dispatch(thunkFetchGroup(groupId));
		else setDescription('');
	}, [dispatch, groupId, isEditMode]);

	// Prefill form when editing
	useEffect(() => {
		if (group && isEditMode) {
			setDescription(group.description || '');
			setSelectedFriends(group.invitedFriends || []);
		}
	}, [group, isEditMode]);

	const selectedEvent = events.find((event) => event.id === group?.eventId);

	// Save group (create or update)
	const handleSaveGroup = (e) => {
		e.preventDefault();
		const groupData = { description, friends: selectedFriends };
		if (isEditMode) {
			dispatch(thunkUpdateGroup({ ...groupData, groupId })).then(() =>
				navigate('/events')
			);
		} else {
			dispatch(thunkCreateGroup(groupData)).then(() => navigate('/events'));
		}
	};

	// Delete group
	const handleDeleteGroup = async () => {
		await dispatch(thunkDeleteGroup(groupId));
		navigate('/dashboard'); // Redirect after delete
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
					{/* Dummy friends list (can be replaced with real friend data) */}
					{['Friend Name 1', 'Friend Name 2', 'Friend Name 3'].map(
						(friend, index) => (
							<div className='friend-item' key={index}>
								<span>{friend}</span>
								<button
									className={`select-friend-button ${
										selectedFriends.includes(friend) ? 'selected' : ''
									}`}
									onClick={() => toggleFriendSelection(friend)}>
									{selectedFriends.includes(friend) ? 'Remove' : 'Add'}
								</button>
							</div>
						)
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
