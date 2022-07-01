from flask import Blueprint, jsonify, make_response, request
from app.models import db, Topic

topic_routes = Blueprint('topics', __name__)


@topic_routes.route('/')
def get_topics():
    topics = Topic.query.all()
    return {'topics': [topic.to_dict() for topic in topics]}

@topic_routes.route('/', methods=['POST'])
def post_topic():
    topic = Topic(
        title = request.json['title'],
        time_estimate = request.json['time_estimate'],
        description = request.json['description']
    )
    try:
        db.session.add(topic)
        db.session.commit()
        return jsonify(topic.to_dict())
    except:
        return make_response({f'errors': ['Error(s) on the topic occurred']}, 400)

@topic_routes.route('/', methods=['PUT'])
def put_topic():
    db.session.query(Topic).filter(Topic.id == request.json['id']).update({
        'title': request.json['title'],
        'time_estimate': request.json['time_estimate'],
        'description': request.json['description']
    }, synchronize_session = 'fetch')
    db.session.commit()
    topic = Topic.query.get(request.json['id'])
    if topic:
        return jsonify(topic.to_dict())
    else:
        return make_response({'errors': ['Edit on non-existent topic']}, 404)

@topic_routes.route('/', methods=['DELETE'])
def delete_topic():
    topic = Topic.query.get(request.json['id'])
    if topic:
        db.session.delete(topic)
        db.session.commit()
        return jsonify({'errors': False})
    else:
        return make_response({'errors': ['Delete on non-existent topic']}, 404)
