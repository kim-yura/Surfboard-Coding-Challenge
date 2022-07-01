import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadAllTopics } from '../store/topics';

const Home = () => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => {
        return state.session.user || ''
    });

    const topics = useSelector(state => {
        return Object.values(state.topics)
    });

    useEffect(() => {
        dispatch(loadAllTopics())
    }, []);

    return (
        <div>
            AGENDA
            {topics.map((topic, idx) => {
                return (
                    <div>
                        {topic.title}
                    </div>
                )
            })}
        </div>
    )
};

export default Home;
