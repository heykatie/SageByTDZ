import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	thunkFetchGroup,
	thunkCreateGroup,
	thunkUpdateGroup,
	thunkDeleteGroup,
} from '../../redux/group';
import './GroupComponent.css';

const GroupComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { groupId } = useParams(); // Get groupId from URL for editing
	const { group, loading, error } = useSelector((state) => state.group);
	const [description, setDescription] = useState('');
	const [friendsInvited, setFriendsInvited] = useState([]);
	const [showRemoveFriendModal, setShowRemoveFriendModal] = useState(false);
	const [friendToRemove, setFriendToRemove] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const isEditMode = !!groupId; // True if editing, false if creating

	// Fetch group if editing
	useEffect(() => {
		if (isEditMode) dispatch(thunkFetchGroup(groupId));
		else setDescription(''); // Reset form for create mode
	}, [dispatch, groupId, isEditMode]);

	// Prefill form when editing
	useEffect(() => {
		if (group && isEditMode) {
			setDescription(group.description || '');
			setFriendsInvited(group.invitedFriends || []); // Assuming `invitedFriends` is part of the group object
		}
	}, [group, isEditMode]);

	// Save group (create or update)
	const handleSaveGroup = (e) => {
		e.preventDefault();
		const groupData = { description };
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

	// Handle removing a friend
	const confirmRemoveFriend = (friend) => {
		setFriendToRemove(friend);
		setShowRemoveFriendModal(true);
	};

	const handleRemoveFriend = () => {
		setFriendsInvited(
			friendsInvited.filter((f) => f.id !== friendToRemove.id)
		);
		setShowRemoveFriendModal(false);
		setFriendToRemove(null);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className='group-form-page'>
			<h2>{isEditMode ? 'Edit Group' : 'Create New Group'}</h2>
			<form className='group-form' onSubmit={handleSaveGroup}>
				<label htmlFor='description'>Group Description:</label>
				<textarea
					id='description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				{/* Friends Invited Section */}
				<section className='friends-section'>
					<h3>Friends Invited</h3>
					<div className='friends-list'>
						{friendsInvited.length > 0 ? (
							friendsInvited.map((friend) => (
								<div className='friend-item' key={friend.id}>
									<span>{friend.name}</span>
									<button
										className='remove-friend'
										onClick={() => confirmRemoveFriend(friend)}>
										X
									</button>
								</div>
							))
						) : (
							<p>No friends invited yet.</p>
						)}
					</div>
					{/* Buttons for adding friends */}
					<div className='add-friend-options'>
						<button type='button' className='add-friend-button'>
							+ Add New Friend
						</button>
						<button type='button' className='invite-email-button'>
							+ Invite By Email
						</button>
					</div>
				</section>
				{/* Save and Delete Buttons */}
				<div className='group-buttons'>
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
				</div>
			</form>

			{/* Remove Friend Modal */}
			{showRemoveFriendModal && (
				<div className='modal-overlay'>
					<div className='modal-content'>
						<p>Are you sure you want to remove {friendToRemove?.name}?</p>
						<div className='modal-buttons'>
							<button
								onClick={handleRemoveFriend}
								className='confirm-remove'>
								Yes, Remove
							</button>
							<button
								onClick={() => setShowRemoveFriendModal(false)}
								className='cancel-remove'>
								No, Go Back
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete Group Modal */}
			{showDeleteModal && (
				<div className='modal-overlay'>
					<div className='modal-content'>
						<p>Are you sure you want to delete this group?</p>
						<div className='modal-buttons'>
							<button
								onClick={handleDeleteGroup}
								className='confirm-delete'>
								Yes, Delete
							</button>
							<button
								onClick={() => setShowDeleteModal(false)}
								className='cancel-delete'>
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
