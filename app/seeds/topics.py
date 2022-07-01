from app.models import db, Topic


def seed_topics():
    topic_1 = Topic(
        title='Topic 1: Intro to React',
        time_estimate='1 hour',
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    )
    topic_2=Topic(
        title='Topic 2: Intro to Python',
        time_estimate='45 minutes',
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    )
    topic_3=Topic(
        title='Topic 3: What is Full Stack Development?',
        time_estimate='2 hours',
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    )

    db.session.add(topic_1)
    db.session.add(topic_2)
    db.session.add(topic_3)

    db.session.commit()

def undo_topics():
    db.session.execute('TRUNCATE topics RESTART IDENTITY CASCADE;')
    db.session.commit()
