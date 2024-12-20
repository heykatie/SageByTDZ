from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Organizer(db.Model):
    __tablename__ = 'organizers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    logo = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    # feedback_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('feedback_id')), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'logo': self.city,
            'link': self.state,
            'phone_number': self.address,
            'email': self.event_date,
            # 'feedback_id': self.feedback_id,
        }
