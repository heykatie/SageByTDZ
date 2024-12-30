from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Event(db.Model):
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    # category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=True)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    event_date = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.String(255), nullable=False)
    end_time = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())
    organizer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('organizers.id')), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category_id': self.category_id,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'event_date': self.event_date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'organizer_id': self.organizer_id,
        }


from .organizer import Organizer