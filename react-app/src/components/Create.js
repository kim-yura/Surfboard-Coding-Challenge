import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createTopic } from '../store/topics';

const Create = () => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => {
        return state.session.user || ''
    });

    const [title, setTitle] = useState('');
    const [timeEstimate, setTimeEstimate] = useState('');
    const [description, setDescription] = useState('');

    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        window.scrollTo(0, 0);
        e.preventDefault();

        // ERROR HANDLING HERE

        const newTopic = {
            title,
            timeEstimate,
            description
        };

        const errors = [];

        if (!sessionUser) errors.push('You must be logged in as a presenter to submit a topic.');
        if (!title) errors.push('Please enter a title.');
        if (timeEstimate) {
            if (timeEstimate.length > 20) {
                errors.push('Time estimate cannot be longer than 20 characters.');
            }
        };

        setValidationErrors(errors);

        if (!errors.length) {
            const submittedTopic = await dispatch(createTopic(newTopic));
            history.push(`/topics/${submittedTopic.id}`);
        };
    };

    return (
        <div id='new-topic-form'>
            <form onSubmit={handleSubmit}>

                {validationErrors.length ?
                    <div id='form-errors'>
                        {validationErrors.length > 0 &&
                            validationErrors.map(error =>
                                <p className='form-error' key={error}>
                                    {error}
                                </p>
                            )}
                    </div>
                    : ''}

                <div id='form'>
                    <h2>Submit a New Topic</h2>
                </div>

            </form>
        </div>
    )

};

export default Create;
