import { csrfFetch } from '../helpers';

const LOAD_ALL_TOPICS = 'topics/loadAllTopics';
const CREATE_TOPIC = 'topics/createTopic';
const EDIT_TOPIC = 'topics/editTopic';
const DELETE_TOPIC = 'topics/deleteTopic';

// -------------------- READ -------------------- //

export const loadAllTopics = () => async (dispatch) => {
    const response = await csrfFetch('/api/topics/');
    const allTopics = await response.json();
    dispatch(loadAllTopicsAction(allTopics));
    return allTopics;
};

const loadAllTopicsAction = (allTopics) => ({
    type: LOAD_ALL_TOPICS,
    allTopics
});

// -------------------- CREATE -------------------- //

export const createTopic = ({
    title,
    timeEstimate,
    description
}) => async (dispatch) => {
    const response = await csrfFetch('/api/topics/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            time_estimate: timeEstimate,
            description,
        })
    });

    if (response.ok) {
        const topic = await response.json();
        dispatch(createTopicAction(topic));
        return topic;
    }
};

const createTopicAction = (topic) => ({
    type: CREATE_TOPIC,
    topic
});

// -------------------- EDIT -------------------- //

export const editTopic = ({
    id,
    title,
    timeEstimate,
    description
}) => async (dispatch) => {
    const response = await csrfFetch('/api/topics/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            title,
            time_estimate: timeEstimate,
            description,
        })
    });

    if (response.ok) {
        const topic = await response.json();
        dispatch(editTopicAction(topic));
        return topic;
    }
};

const editTopicAction = (topic) => ({
    type: EDIT_TOPIC,
    topic
});

// -------------------- DELETE -------------------- //

export const deleteTopic = (topicId) => async (dispatch) => {
    const response = await csrfFetch('/api/topics', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: topicId })
    });
    const topic = await response.json();
    dispatch(deleteTopicAction(topic, topicId));
};

const deleteTopicAction = (topic, topicId) => {
    return {
        type: DELETE_TOPIC,
        topic,
        topicId
    };
};

// -------------------- REDUCER -------------------- //

const topicReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case LOAD_ALL_TOPICS:
            action.allTopics.forEach(topic => {
                newState[topic.id] = topic;
            });
            return newState;
        case CREATE_TOPIC:
        case EDIT_TOPIC:
            newState[action.topic.id] = action.topic;
            return newState;
        case DELETE_TOPIC:
            delete newState[action.topicId];
            return newState;

        default:
            return state;
    }
}

export default topicReducer;
