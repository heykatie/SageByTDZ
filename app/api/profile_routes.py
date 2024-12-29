from flask import Blueprint, jsonify
from app.models import User, Event, Feedback

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/')

@profile_routes.route('/confirm')

@profile_routes.route('/edit', methods=["PUT"])