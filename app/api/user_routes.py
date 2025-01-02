from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, RSVP

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/current')
@login_required
def current_user_data():
    """
    Return the currently logged-in user's data
    """
    return current_user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update a user's information by id
    """
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if user.id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    data = request.get_json()
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.city = data.get('city', user.city)
    user.state = data.get('state', user.state)
    # Add more fields as needed

    user.save()  # Assuming `save` is a method that commits the changes to the database
    return user.to_dict()

@user_routes.route('/events')
@login_required
def user_events():
    user_events = RSVP.query.filter_by(user_id=current_user.id).all()
    return {'events': [event.to_dict() for event in user_events]}

@user_routes.route('/badges')
@login_required
def user_badges():
    return {'badges': current_user.badges}