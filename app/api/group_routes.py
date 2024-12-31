from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import User, Group, RSVP, Invites
from app.models.db import db

group_routes = Blueprint('groups', __name__)

@group_routes.route('/')
@login_required
def get_user_groups():
    """
    Get all groups the current user is in.
    """

    groups = Invites.query.filter(Invites.going and Invites.user_id == current_user.id).all()
    if not groups:
        return {"message": "No groups could be found"}, 404
    return {"Groups": [group.to_dict() for group in groups]}

@group_routes.route('/<int:groupId>')
@login_required
def get_group_details(groupId):
    """
    Get details of a specific group.
    """
    group = Group.query.get(groupId)
    if not group:
        return {"message": "Group not found"}, 404
    return group.to_dict()

@group_routes.route('/', methods=['POST'])
@login_required
def create_group():
    """
    Create a new group.
    """
    data = request.get_json()
    event_id = data.get("eventId")
    if not event_id:
        return {
            "message": "Bad Request",
            "errors": {"eventId": "Event choice is required"}
        }, 400

    new_group = Group(
        event_id=event_id,
        owner_id=current_user.id
    )
    db.session.add(new_group)
    db.session.commit()
    return new_group.to_dict(), 201

@group_routes.route('/<int:groupId>', methods=['DELETE'])
@login_required
def delete_group(groupId):
    """
    Delete a group. Only the creator can delete it.
    """
    group = Group.query.get(groupId)
    if not group:
        return {"message": "Group not found"}, 404
    if group.owner_id != current_user.id:
        return {"message": "Unauthorized"}, 403

    db.session.delete(group)
    db.session.commit()
    return {"message": "Successfully deleted group"}

@group_routes.route('/<int:groupId>/members')
@login_required
def get_group_members(groupId):
    """
    Get all members of a specific group.
    """
    group = Group.query.get(groupId)
    if not group:
        return {"message": "Group not found"}, 404

    members = User.query.join(RSVP, RSVP.user_id == User.id).filter(
        RSVP.event_id == group.event_id
    ).all()

    return {"Members": [member.to_dict() for member in members]}