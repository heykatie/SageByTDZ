import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addOrgFeedback } from "../../redux/event";
import FeedbackRatingInput from "./FeedbackRatingInput";
import './FeedbackRatingInput.css';

const FeedbackModal = ({ organizer, user }) => {
    const [reaction, setReaction] = useState(0);
    const [disabled, setDisabled] = useState(true);

    const [errors, setErrors] = useState({});


    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const onChange = (num) => {
        setReaction(parseInt(num));
      };

    useEffect(() => {
        if(reaction > 0) setDisabled(false);
    }, [disabled, reaction])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const feedback = {
            organizer_id: organizer.id,
            reaction,
            user_id: user.id
        };

        return dispatch(addOrgFeedback(feedback))
        .then(closeModal)
        .catch(async (res) => {
        const data = await res.json();
        if ( data ) {
            setErrors(data);
        }
        });
    }
    return (
        <>
        <div className='modal'>
        <div className="modal-text">
        <h1>How was working with {organizer.name}?</h1>
        <p>Send feedback to the event organizers!</p>
        <p>What emoji best fits your experience?</p>
        </div>
        <form onSubmit={handleSubmit}>
            <p className="errors">{errors.message}</p>
            <div className="feedback-input">
            <label>
                <FeedbackRatingInput
                disabled={false}
                onChange={onChange}
                className='reactions'
                rating={reaction}
                 />
            </label>
            </div>
            <div className='feedback-button'>
            <button type="Submit" disabled={disabled} className={disabled ? 'off' : 'on'}>Submit Your Review</button>
            </div>
        </form>
        </div>
        </>
    )

};

export default FeedbackModal;