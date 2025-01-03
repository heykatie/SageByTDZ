import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';
import CreateGroupModal from '../CreateGroupModal';

function Navigation() {
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

	// Open modal
	const openModal = () => {
		setShowCreateGroupModal(true);
	};

	// Close modal
	const closeModal = () => {
		console.log('Closing modal'); // Debug log to ensure it's firing
		setShowCreateGroupModal(false);
	};

	return (
		<nav className='nav'>
			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>

				<li>
					<ProfileButton />
				</li>

				{/* Create Group Modal */}
				<li className='create-group-container'>
					<button className='create-group-button' onClick={openModal}>
						Create Group
					</button>
					{showCreateGroupModal && (
						<CreateGroupModal onClose={closeModal} />
					)}
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
