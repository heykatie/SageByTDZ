import './FeedbackModal.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useParams } from 'react-router-dom';
import { singleEvent } from '../../redux/event';

export default function FeedbackFormModal() {
    const dispatch = useDispatch();
    const [reaction, setReaction] = useState(0);
    const { closeModal } = useModal();
    const { eventId } = useParams();

    useEffect(() => {
        dispatch(singleEvent(eventId))
    }, [dispatch, eventId])

    //find event by id thunk

    const handleSubmit = async e => {
        e.preventDefault();

        // const serverResponse = await dispatch(
        //     thunkLogin({
        //     reaction,
        //     eventId,
        //     })
        // );
    
        // if (serverResponse) {
        //     setErrors(serverResponse);
        // } else {
        //     closeModal();
        // }
    };

    return (
        <div>
            <h1>Feedback for Event Title</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    {`:)`}
                    <input
                    type='radio'
                    aria-label='happy-face'
                    onClick={setReaction(3)} 
                    />
                </label>
                <label>
                    {`:|`}
                    <input
                    type='radio'
                    aria-label='neutral-face'
                    onClick={setReaction(2)} 
                    />
                </label>
                <label>
                    {`:(`}
                    <input
                    type='radio'
                    aria-label='sad-face'
                    onClick={setReaction(1)} 
                    />
                </label>
                <button
                type='submit'
                aria-label='submit-feedback'
                disabled={reaction<1}
                onClick={closeModal}
                >Submit Feedback</button>
            </form>
        </div>
    )
}