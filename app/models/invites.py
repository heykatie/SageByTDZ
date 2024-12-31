from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Invites(db.Model):
    __tablename__ = 'invites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    friend_id = db.Column(db.Integer, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    going = db.Column(db.Boolean, default=False)


    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'friend_id': self.friend_id,
        'group_id': self.group_id,
        'event_id': self.event_id,
        'created_at': self.created_at,
        'going': self.going
        }


from .event import Event
from .group import Group
from .user import User
#  db.ForeignKey(add_prefix_for_prod('friend.id')),