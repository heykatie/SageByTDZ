import './RSVPModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';

export default function RSVPModal({navigate, eventId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleClick = e => {
        e.preventDefault();

        // need create rsvp thunk
        return dispatch()
            .then(closeModal)
            .then(navigate(`/events/${eventId}`))
    }

    return (
        <div className='confirm-rsvp-modal'>
            <h1>Confirm RSVP for:</h1>
            <h3>Event Name?</h3>
            <button 
            onClick={handleClick} 
            id='yes'
            aria-label='rsvp-yes' 
            >Yes (I plan to attend)</button>
            <button 
            onClick={closeModal} 
            id='yes'
            aria-label='close-modal' 
            >No (Go Back)</button>
        </div>
    )
}