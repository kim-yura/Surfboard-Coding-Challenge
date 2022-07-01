import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';

import { deleteTopic, loadAllTopics } from '../store/topics';

const Topic = () => {
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
    let currentTopic = undefined;
    let prevTopic = undefined;
    let nextTopic = undefined;
    topics.forEach((topic) => {
        if (topic.id == Number(topicId)) {
            currentTopic = topic;
        } else if (topic.id == Number(topicId) - 1) {
            prevTopic = topic;
        } else if (topic.id == Number(topicId) + 1) {
            nextTopic = topic;
        };
    });

    const handleDelete = async (e) => {
        e.preventDefault();
        const topic = {
            id: Number(topicId)
        };
        await dispatch(deleteTopic(topic));
        history.push('/');
    }

    useEffect(() => {
        dispatch(loadAllTopics())
    }, []);

    return (
        <div id='topic-view'>
            <div id='topic-details'>
                <h2>
                    {currentTopic?.title}
                </h2>
                <p className='topic-time'>
                    {currentTopic?.estimate}
                </p>
                <p>
                    {currentTopic?.description}
                </p>
            </div>
            {sessionUser ?
            <div id='topic-options'>
                <Link to={`/topics/${topicId}/edit`}>Edit Topic</Link>
                <p id='delete-button' onClick={handleDelete}>Delete Topic</p>
            </div>
            : ''}
            <div id='topic-navigation'>
                <div id='topic-navigation-left'>
                    {prevTopic ?
                        <>
                            <p>Previous Topic:</p>
                            <Link to={`/topics/${prevTopic.id}`}>{prevTopic.title}</Link>
                        </> : ''}
                </div>
                <div id='topic-navigation-right'>
                    {nextTopic ?
                        <>
                            <p>Next Topic:</p>
                            <Link to={`/topics/${nextTopic.id}`}>{nextTopic.title}</Link>
                        </> : ''}
                </div>
            </div>
        </div>
    )
};

export default Topic;
