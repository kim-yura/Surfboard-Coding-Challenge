from .db import db


class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    estimate = db.Column(db.String(20))
    description = db.Column(db.Text)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'estimate': self.estimate,
            'description': self.description
        }
