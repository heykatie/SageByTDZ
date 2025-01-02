from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .organizer import Organizer


class Feedback(db.Model):
    __tablename__ = 'feedback'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('organizers.id')), nullable=False)
    reaction = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'organizer_id': self.organizer_id,
            'reaction': self.reaction,
        }
