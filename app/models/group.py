from .db import db, environment, SCHEMA, add_prefix_for_prod


class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    messages = db.relationship('Message', backref='author', cascade='all, delete-orphan')

    # Relationships
    # event = db.relationship('Event', backref='groups', lazy=True)
    # event = db.relationship('Event', back_populates='groups')
    # owner = db.relationship('User', back_populates='owned_groups')

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'owner_id': self.owner_id
        }

from .user import User