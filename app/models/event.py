from .db import db, environment, SCHEMA, add_prefix_for_prod
from .organizer import Organizer
import datetime


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('organizers.id')), nullable=False)
    categories = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    event_date = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.String(255), nullable=False)
    end_time = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())
    badge_url = db.Column(db.String(255), nullable=False)
    preview = db.Column(db.String(255), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'organizer_id': self.organizer_id,
            'categories': self.categories,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'event_date': self.event_date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'badge_url': self.badge_url,
            'preview': self.preview
        }
