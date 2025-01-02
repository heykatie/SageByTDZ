from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .event import Event


class RSVP(db.Model):
    __tablename__ = 'rsvps'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    # going = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            # 'going': self.going,
        }
