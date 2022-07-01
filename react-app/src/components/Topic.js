import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
    topics.forEach((topic) => {
        if (topic.id == topicId) {
            currentTopic = topic;
        };
    });

    useEffect(() => {
        dispatch(loadAllTopics())
    }, []);

    return (
        <div id='topic-view'>
            {currentTopic?.title}
            {currentTopic?.time_estimate}
            {currentTopic?.description}
        </div>
    )
};

export default Topic;
