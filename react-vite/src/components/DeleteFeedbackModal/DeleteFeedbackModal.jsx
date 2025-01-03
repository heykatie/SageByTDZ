import './DeleteFeedbackModal.css';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';

export default function DeleteFeedbackModal({navigate, eventId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleClick = e => {
        e.preventDefault();

        // need delete feedback thunk
        return dispatch()
            .then(closeModal)
            .then(navigate(`/events/${eventId}`))
    }

    return (
        <div className='delete-feedback-modal'>
            <h1>Remove RSVP for:</h1>
            <h3>Event Name?</h3>
            <button 
            onClick={handleClick} 
            id='delete-feedback'
            aria-label='yes-delete-feedback' 
            >Yes (Delete feedback)</button>
            <button 
            onClick={closeModal} 
            id='no-go-back'
            aria-label='close-modal' 
            >No (Go Back)</button>
        </div>
    )
}