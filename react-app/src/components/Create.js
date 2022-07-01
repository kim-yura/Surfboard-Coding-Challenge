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
    const [estimate, setEstimate] = useState('');
    const [description, setDescription] = useState('');

    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        window.scrollTo(0, 0);
        e.preventDefault();

        // ERROR HANDLING HERE

        const newTopic = {
            title,
            estimate,
            description
        };

        const errors = [];

        if (!sessionUser) errors.push('You must be logged in as a presenter to submit a topic.');
        if (!title) errors.push('Please enter a title.');
        if (estimate) {
            if (estimate.length > 20) {
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
        <div id='form-view'>
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
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        id='title'
                        type='text'
                        placeholder='Enter a title for your Topic'
                    />
                    <input
                        onChange={(e) => setEstimate(e.target.value)}
                        value={estimate}
                        id='estimate'
                        type='text'
                        placeholder='Enter a time estimate'
                    />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id='description'
                        type='text'
                        placeholder='Enter a description'
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )

};

export default Create;
