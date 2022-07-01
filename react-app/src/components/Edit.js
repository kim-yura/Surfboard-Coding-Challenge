import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editTopic, loadAllTopics } from '../store/topics';

const Edit = () => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const history = useHistory();
    const { topicId } = useParams();

    const sessionUser = useSelector(state => {
        return state.session.user || ''
    });

    const topics = useSelector(state => {
        return Object.values(state.topics)
    });
    let currentTopic;
    topics.forEach((topic) => {
        if (topic.id == Number(topicId)) {
            currentTopic = topic;
        };
    });

    useEffect(() => {
        dispatch(loadAllTopics());
    }, []);

    useEffect(() => {
        if (currentTopic) {
            setTitle(currentTopic.title);
            setEstimate(currentTopic.estimate);
            setDescription(currentTopic.description);
        }
    }, [currentTopic]);
    // const currentTopic = topics[topicId - 1];

    const [title, setTitle] = useState('');
    const [estimate, setEstimate] = useState('');
    const [description, setDescription] = useState('');

    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        window.scrollTo(0, 0);
        e.preventDefault();

        // ERROR HANDLING HERE

        const newTopic = {
            id: topicId,
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
            const topic = await dispatch(editTopic(newTopic));
            history.push(`/topics/${topic.id}`);
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
                    <h2>Edit a Topic</h2>
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

export default Edit;
