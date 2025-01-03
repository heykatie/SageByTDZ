import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	thunkFetchGroup,
	thunkUpdateGroup,
	thunkDeleteGroup,
} from '../../redux/group';
import './GroupPage.css';

const EditGroupPage = ({ eventId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { group } = useSelector((state) => state.group);

	// Local state for editing group description and modal state
	const [description, setDescription] = useState('');
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	// Fetch the group data when the component mounts
	useEffect(() => {
		dispatch(thunkFetchGroup(eventId));
	}, [dispatch, eventId]);

	// Sync local state with fetched data
	useEffect(() => {
		if (group) {
			setDescription(group.description || '');
		}
	}, [group]);

	// Save updated group
	const handleSaveGroup = () => {
		dispatch(
			thunkUpdateGroup({
				groupId: group.id,
				description,
			})
		).then(() => navigate('/events'));
	};

	// Handle group deletion
	const handleDeleteGroup = () => {
		dispatch(thunkDeleteGroup(group.id)).then(() => navigate('/dashboard'));
	};

	return (
		<div className='edit-group-page'>
			<h2>{group?.eventName || 'Event Name'}</h2>
			<p>
				{group?.eventDate} | {group?.eventTime} | {group?.eventCategory}
			</p>
			<p>{group?.location}</p>
			<a href={`/events/${eventId}`} className='event-link'>
				Link to event page
			</a>

			{/* Group Description */}
			<div className='group-description'>
				<label htmlFor='description'>Add group description:</label>
				<textarea
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			{/* Friends List */}
			<section className='friends-section'>
				<h3>Friends Invited</h3>
				<div className='friends-list'>
					{group?.invitedFriends?.map((friend) => (
						<div className='friend-item' key={friend.id}>
							<span>{friend.name}</span>
							<button
								className='remove-friend'
								onClick={() => console.log(`Remove ${friend.name}`)}>
								X
							</button>
						</div>
					))}
					<p className='add-friend-option'>+ Add New Friend</p>
					<p className='invite-by-email'>+ Invite by Email</p>
				</div>
			</section>

			{/* Save and Delete Buttons */}
			<div className='group-buttons'>
				<button className='save-group-button' onClick={handleSaveGroup}>
					Save Group
				</button>
				<button
					className='delete-group-button'
					onClick={() => setShowDeleteModal(true)}>
					Delete Group
				</button>
			</div>

			{/* Delete Group Modal */}
			{showDeleteModal && (
				<div className='delete-modal'>
					<div className='delete-modal-content'>
						<p>Are you sure you want to delete this group?</p>
						<div className='modal-buttons'>
							<button onClick={handleDeleteGroup}>Yes, Delete</button>
							<button onClick={() => setShowDeleteModal(false)}>
								No, Go Back
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditGroupPage;
