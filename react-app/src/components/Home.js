import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadAllTopics } from '../store/topics';

import Topic from './Topic';

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
        <div id='agenda-page'>
            <h1>AGENDA</h1>
            {topics.map((topic, idx) => {
                return (
                    <Link to={`/topics/${topic.id}`}>{topic.title}</Link>
                )
            })}
        </div>
    )
};

export default Home;
