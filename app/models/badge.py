from .db import db, environment, SCHEMA, add_prefix_for_prod
from .event import Event


class Badge(db.Model):
    __tablename__ = 'badges'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(Event.id)), nullable=True)
    url = db.Column(db.String(255), nullable=False, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'URL': self.url,
        }
