from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
# from .badge import Badge


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    firstName = db.Column(db.String(255), nullable=False)
    lastName = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True, default='assets/sprout.png')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    requests = db.relationship('Request', backref='sender', cascade='all, delete-orphan')
    # badge_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(Badge.id)), nullable=True)
    # badge = db.relationship('Badge', backref=db.backref('users', lazy=True))
    hashed_password = db.Column(db.String(255), nullable=False)

    owned_groups = db.relationship('Group', backref='owner')
    owned_groups = db.relationship('Group', back_populates='owner', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'city': self.city,
            'state': self.state,
            'address': self.address,
            'profile_pic': self.profile_pic
            # 'badge_id': self.badge_id
        }
