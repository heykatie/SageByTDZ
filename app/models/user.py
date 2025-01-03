from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
# from . import Badge, Request, Invite, Group


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    profile_pic = db.Column(db.String(255), nullable=True, default='assets/sprout.png')
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    requests = db.relationship('Request', backref='sender', cascade='all, delete-orphan')
    invites = db.relationship('Invites', backref='sender', cascade='all, delete-orphan')
    # badge_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('badges.id')), nullable=True)
    # badge_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('badges.id')), nullable=True)
    # badge = db.relationship('Badge', backref=db.backref('users', lazy=True))
    hashed_password = db.Column(db.String(255), nullable=False)

    # requests = db.relationship('Request', foreign_keys='Request.sender_id', backref='sender', cascade='all, delete-orphan')
    # invites = db.relationship('Invites', foreign_keys='Invites.user_id', backref='receiver', cascade='all, delete-orphan')
    owned_groups = db.relationship('Group', backref='owner', cascade='all, delete-orphan')

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
        'first_name': self.first_name,
        'last_name': self.last_name,
        'city': self.city,
        'state': self.state,
        'address': self.address,
        'profile_pic': self.profile_pic,
        # 'requests': [request.to_dict() for request in self.requests],
        # 'invites': [invite.to_dict() for invite in self.invites],
        # 'badges': [badge.to_dict() for badge in self.badges] if hasattr(self, 'badges') else []
    }
