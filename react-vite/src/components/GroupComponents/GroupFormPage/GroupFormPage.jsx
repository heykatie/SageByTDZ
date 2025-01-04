import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
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

const GroupFormPage = ({ isEditMode, groupData }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation(); // Get data from route state
	const eventData = location.state?.eventData; // Get eventData from modal navigation

	const [description, setDescription] = useState('');
	const [friendsList, setFriendsList] = useState([]);
	const [selectedFriends, setSelectedFriends] = useState([]);
	const [showRemoveModal, setShowRemoveModal] = useState(false);
	const [friendToRemove, setFriendToRemove] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	useEffect(() => {
		if (!eventData) {
			alert('No event data provided. Redirecting to events page...');
			navigate('/events'); // Redirect if event data is missing
			return;
		}
		if (isEditMode && groupData) {
			setDescription(groupData.description || '');
			setSelectedFriends(groupData.invitedFriends || []);
		}
		dispatch(fetchUserFriends()).then((friends) => setFriendsList(friends));
	}, [dispatch, isEditMode, groupData, eventData, navigate]);

	const handleSaveGroup = async (e) => {
		e.preventDefault();
		const payload = {
			description,
			eventId: eventData.id, // Use event ID passed from modal
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

	return (
		<div className='group-form-page'>
			<h2>
				{isEditMode
					? `Edit Group - ${eventData.title}`
					: `Create Group - ${eventData.title}`}
			</h2>
			<p>Hosted by: {eventData.organizer}</p>
			<p>{`${eventData.event_date} | ${eventData.start_time} | ${eventData.categories}`}</p>
			<p>{eventData.address}</p>
			<a href={`/events/${eventData.id}`} className='event-link'>
				Link to Event Page
			</a>

			{/* Group description */}
			<label htmlFor='description'>Add group description:</label>
			<textarea
				id='description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			{/* Other UI elements */}
		</div>
	);
};

export default GroupFormPage;
