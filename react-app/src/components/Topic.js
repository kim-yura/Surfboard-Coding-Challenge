import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { loadAllTopics } from '../store/topics';

const Topic = () => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const { topicId } = useParams();

    const sessionUser = useSelector(state => {
        return state.session.user || ''
    });

    const topics = useSelector(state => {
        return Object.values(state.topics)
    });
    console.log(topics)
    const currentTopic = topics[topicId - 1];
    let prevTopic = undefined;
    if (topicId - 2 >= 0) {
        prevTopic = topics[topicId - 2];
    };
    let nextTopic = undefined;
    if (topics[topicId]) {
        nextTopic = topics[topicId];
    };

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
                    {currentTopic?.time_estimate}
                </p>
                <p>
                    {currentTopic?.description}
                </p>
            </div>
            {sessionUser ?
            <div id='topic-options'>
                <Link to={`/topics/${topicId}/edit`}>Edit Topic</Link>
                <Link to={`/topics/${topicId}/delete`}>Delete Topic</Link>
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
