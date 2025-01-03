import './RemoveRSVPModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';

export default function RemoveRSVPModal({navigate, eventId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleClick = e => {
        e.preventDefault();

        // need delete rsvp thunk
        return dispatch()
            .then(closeModal)
            .then(navigate(`/events/${eventId}`))
    }

    return (
        <div className='remove-rsvp-modal'>
            <h1>Remove RSVP for:</h1>
            <h3>Event Name?</h3>
            <button 
            onClick={handleClick} 
            id='remove-yes'
            aria-label='remove-rsvp-I-do-not-plan-to-attend' 
            >Remove RSVP (I do not plan to attend)</button>
            <button 
            onClick={closeModal} 
            id='no-go-back'
            aria-label='close-modal' 
            >No (Go Back)</button>
        </div>
    )
}