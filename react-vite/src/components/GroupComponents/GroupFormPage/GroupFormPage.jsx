import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	CreateGroupModal,
	DeleteGroupModal,
	RemoveFriendModal,
} from '../GroupModals';
import {
	thunkCreateGroup,
	thunkUpdateGroup,
	thunkDeleteGroup,
} from '../../../redux/group';
import { fetchUserFriends } from '../../../redux/user';

const GroupFormPage = ({ isEditMode, groupData, eventData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [description, setDescription] = useState('');
	const [friendsList, setFriendsList] = useState([]);
	const [selectedFriends, setSelectedFriends] = useState([]);
	const [showRemoveModal, setShowRemoveModal] = useState(false);
	const [friendToRemove, setFriendToRemove] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	// Load data on mount
	useEffect(() => {
		if (isEditMode && groupData) {
			setDescription(groupData.description || '');
			setSelectedFriends(groupData.invitedFriends || []);
		}
		dispatch(fetchUserFriends()).then((res) => {
			if (res?.friends) setFriendsList(res.friends);
		});
	}, [dispatch, isEditMode, groupData]);

	// Handle Save Group
	const handleSaveGroup = async (e) => {
		e.preventDefault();
		if (!eventData) {
			alert('Event data is missing!');
			return;
		}
		const payload = {
			description,
			eventId: eventData.id,
			friends: selectedFriends,
		};
		if (isEditMode) {
			await dispatch(
				thunkUpdateGroup({ ...payload, groupId: groupData.id })
			);
			navigate(`/events/${eventData.id}`);
		} else {
			await dispatch(thunkCreateGroup(payload));
			navigate(`/events/${eventData.id}`);
		}
	};

	// Handle Delete Group
	const handleDeleteGroup = async () => {
		await dispatch(thunkDeleteGroup(groupData.id));
		navigate('/dashboard');
	};

	// Open remove friend modal
	const openRemoveModal = (friend) => {
		setFriendToRemove(friend);
		setShowRemoveModal(true);
	};

	// Confirm removing a friend
	const handleRemoveFriend = () => {
		setSelectedFriends((prev) =>
			prev.filter((f) => f.id !== friendToRemove.id)
		);
		setShowRemoveModal(false);
	};

	// Toggle friend selection
	const toggleFriendSelection = (friend) => {
		setSelectedFriends((prev) =>
			prev.some((f) => f.id === friend.id)
				? prev.filter((f) => f.id !== friend.id)
				: [...prev, friend]
		);
	};

	// Check if event data is loading
	if (!eventData) {
		return <p>Loading event details...</p>;
	}

	return (
		<div className='group-form-page'>
			<h2>
				{isEditMode
					? `Edit Group - ${eventData.title || 'Event Title'}`
					: `Create Group - ${eventData.title || 'Event Title'}`}
			</h2>
			<p>Hosted by: {`Organizer #${eventData.organizer_id}`}</p>
			<p>{`${eventData.event_date || 'Date'} | ${
				eventData.start_time || 'Time'
			} | ${eventData.categories || 'Categories'}`}</p>
			<p>{eventData.address || 'Address'}</p>
			<a href={`/events/${eventData.id}`} className='event-link'>
				Link to Event Page
			</a>

			{/* Group description */}
			<label htmlFor='description'>Add group description:</label>
			<textarea
				id='description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>

			{/* Friends Section */}
			<section className='friends-section'>
				<h3>{isEditMode ? 'Invited Friends' : 'Invite Friends'}</h3>
				<div className='friends-list'>
					{isEditMode ? (
						selectedFriends.map((friend) => (
							<div key={friend.id} className='friend-item'>
								<span>
									{friend.first_name} {friend.last_name}
								</span>
								<button onClick={() => openRemoveModal(friend)}>
									X
								</button>
							</div>
						))
					) : friendsList.length > 0 ? (
						friendsList.map((friend) => (
							<div key={friend.id} className='friend-item'>
								<span>
									{friend.first_name} {friend.last_name}
								</span>
								<button
									className={
										selectedFriends.some((f) => f.id === friend.id)
											? 'selected'
											: ''
									}
									onClick={() => toggleFriendSelection(friend)}>
									{selectedFriends.some((f) => f.id === friend.id)
										? 'Remove'
										: 'Add'}
								</button>
							</div>
						))
					) : (
						<p>No friends available to invite.</p>
					)}
				</div>
			</section>

			{/* Save and Cancel Buttons */}
			<div className='group-buttons'>
				<button onClick={handleSaveGroup} className='save-group-button'>
					Save Group
				</button>
				<button onClick={() => navigate(`/events/${eventData.id}`)}>
					Cancel
				</button>
				{isEditMode && (
					<button
						onClick={() => setShowDeleteModal(true)}
						className='delete-group-button'>
						Delete Group
					</button>
				)}
			</div>

			{/* Remove Friend Modal */}
			{showRemoveModal && (
				<RemoveFriendModal
					friend={friendToRemove}
					onConfirm={handleRemoveFriend}
					onClose={() => setShowRemoveModal(false)}
				/>
			)}

			{/* Delete Group Modal */}
			{showDeleteModal && (
				<DeleteGroupModal
					groupName={groupData.description}
					onConfirm={handleDeleteGroup}
					onClose={() => setShowDeleteModal(false)}
				/>
			)}
		</div>
	);
};

export default GroupFormPage;
