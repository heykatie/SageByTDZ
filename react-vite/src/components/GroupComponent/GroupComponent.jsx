import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	thunkFetchGroup,
	thunkCreateGroup,
	thunkDeleteGroup,
} from '../../redux/group';
import { fetchUserEvents } from '../../redux/user';
import './GroupComponent.css';

const GroupComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { groupId: paramGroupId } = useParams(); // Get groupId from URL for editing
	const { group, loading, error } = useSelector((state) => state.group);
	const { events, status } = useSelector((state) => state.user);

	// Local state for form data
	const [description, setDescription] = useState('');
	const [selectedEventId, setSelectedEventId] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isEditMode, setIsEditMode] = useState(!!paramGroupId); // Determine edit mode

	// Fetch user's events when component mounts
	useEffect(() => {
		dispatch(fetchUserEvents());
	}, [dispatch]);

	// Fetch group if editing
	useEffect(() => {
		if (paramGroupId) {
			dispatch(thunkFetchGroup(paramGroupId));
			setIsEditMode(true);
		} else {
			setDescription('');
			setSelectedEventId(events?.[0]?.event_id || ''); // Fix: default to the first event if available
			setIsEditMode(false);
		}
	}, [dispatch, paramGroupId, events]);

	// Prefill form when editing
	useEffect(() => {
		if (group && isEditMode) {
			setDescription(group.description || '');
			setSelectedEventId(group.event_id || '');
		}
	}, [group, isEditMode]);

	// Function to handle creating a group (switch to create mode)
	const handleCreateGroup = () => {
		setDescription('');
		setSelectedEventId(events?.[0]?.event_id || ''); // Ensure eventId exists for the form
		setIsEditMode(false);
	};

	// Save group (create or update)
	const handleSaveGroup = (e) => {
		e.preventDefault();
		const groupData = { description, eventId: selectedEventId };

		dispatch(thunkCreateGroup(groupData)).then(() => navigate('/events'));
	};

	// Delete group
	const handleDeleteGroup = async () => {
		await dispatch(thunkDeleteGroup(paramGroupId));
		navigate('/dashboard'); // Redirect after delete
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className='group-form-page'>
			{/* Create New Group Button */}
			<button className='create-group-button' onClick={handleCreateGroup}>
				Create New Group
			</button>

			<h2>{isEditMode ? 'Edit Group' : 'Create New Group'}</h2>
			<form className='group-form' onSubmit={handleSaveGroup}>
				{/* Event Selection (for creating a new group) */}
				{!isEditMode && (
					<div className='event-selection'>
						<label htmlFor='event-select'>Select Event:</label>
						<select
							id='event-select'
							value={selectedEventId}
							onChange={(e) => setSelectedEventId(e.target.value)}
							required>
							<option value='' disabled>
								Select an event
							</option>
							{status === 'loading' ? (
								<option>Loading events...</option>
							) : (
								events?.map((event) => (
									<option key={event.id} value={event.event_id}>
										Event #{event.event_id} (ID {event.id})
									</option>
								))
							)}
						</select>
					</div>
				)}

				<label htmlFor='description'>Group Description:</label>
				<textarea
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<button type='submit' className='save-group-button'>
					{isEditMode ? 'Update Group' : 'Create Group'}
				</button>
				{isEditMode && (
					<button
						type='button'
						className='delete-group-button'
						onClick={() => setShowDeleteModal(true)}>
						Delete Group
					</button>
				)}
			</form>
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
