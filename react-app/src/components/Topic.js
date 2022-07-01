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
    let currentTopic;
    let prevTopic = undefined;
    let nextTopic = undefined;
    topics.forEach((topic) => {
        if (topic.id == topicId) {
            currentTopic = topic;
        } else if (topic.id == Number(topicId) - 1) {
            prevTopic = topic;
        } else if (topic.id = Number(topicId) + 1) {
            nextTopic = topic;
        }
    });

    useEffect(() => {
        dispatch(loadAllTopics())
    }, []);

    return (
        <>
            <div id='topic-view'>
                {currentTopic?.title}
                {currentTopic?.time_estimate}
                {currentTopic?.description}
            </div>
            <div id='topic-navigation'>
                <div>
                    {prevTopic ?
                        <>
                            <p>Previous Topic:</p>
                            <Link to={`/topics/${prevTopic.id}`}>{prevTopic.title}</Link>
                        </> : ''}
                </div>
                <div>
                    {nextTopic ?
                        <>
                            <p>Next Topic:</p>
                            <Link to={`/topics/${nextTopic.id}`}>{nextTopic.title}</Link>
                        </> : ''}
                </div>
            </div>
        </>
    )
};

export default Topic;
