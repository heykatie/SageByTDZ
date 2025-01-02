import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUserEventsData } from '../../redux/userSlice';
import './ProfilePage.css';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const { profile, events, status, error } = useSelector(
		(state) => state.user
	);

	useEffect(() => {
		dispatch(fetchUserData());
		dispatch(fetchUserEventsData());
	}, [dispatch]);

	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'failed') return <p>Error: {error}</p>;

	return (
		<div className='profile-page'>
			{/* Header */}
			<header className='header'>
				<div className='logo'>Sage</div>
				<h1>Welcome, {profile.firstName}!</h1>
			</header>

			{/* User Details */}
			<section className='user-details'>
				<h2>Your Profile</h2>
				<img src={profile.logo || '/default-avatar.png'} alt='Profile' />
				<p>Username: {profile.username}</p>
				<p>Email: {profile.email}</p>
				<p>
					Location: {profile.city}, {profile.state}
				</p>
				<p>
					Badges: {profile.Badges?.join(', ') || 'No badges earned yet'}
				</p>
			</section>

			{/* Statistics */}
			<section className='stats'>
				<h2>Statistics</h2>
				<p>Events Attended: {events.length}</p>
				{/* Add additional statistics as needed */}
			</section>

			{/* Notifications */}
			<section className='notifications'>
				<h2>Notifications</h2>
				<ul>
					{profile.notifications?.map((notif, index) => (
						<li key={index}>{notif.message}</li>
					)) || <p>No notifications</p>}
				</ul>
			</section>

			{/* Events */}
			<section className='events'>
				<h2>Your Events</h2>
				<ul>
					{events.map((event) => (
						<li key={event.id}>
							{event.title} - {event.eventDate}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default ProfilePage;
