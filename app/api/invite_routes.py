from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.db import db
from app.models.invites import Invites

invite_route = Blueprint('invites', __name__ )

@invite_route.route('/')
@login_required
def user_invites():
    """
    Query all the invites sent 
    """
    id = current_user.get_id()
    invites = Invites.query.filter(Invites.user_id == id)

    invites_group = []
    for invite in invites:
        invites_group.append({
        'id': invite.id,
        'user_id': invite.user_id,
        'friend_id': invite.friend_id,
        'group_id': invite.group_id,
        'event_id': invite.event_id,
        'created_at': invite.created_at,
        'going': invite.going
        })

    return {'invites': [invite for invite in invites_group]}


@invite_route.route('/create', methods=['POST'])
@login_required
def create_invite():
    """
    Create a new invite?
    """
    invite = request.json

    new_invite = Invites(**invite)

    db.session.add(new_invite)

    db.session.commit()

    return new_invite.to_dict()


@invite_route.route('/update/<int:invite_id>', methods=['PUT'])
@login_required
def update_invite(invite_id):
    """
    Update an invite either the reponse of the invite you recieved changes going
    or and invite you have sent for a group 
    """
    data = request.json
    invite = Invites.query.get(invite_id)

    if not invite:
        return { 'message': 'Invite not found'}

    if 'going' in data and invite.user_id == current_user.id:
        invite.going = data['going'] # Updata the response to an invite you have received

    if 'group_id' in data and invite.user_id == current_user.id:
        invite.group_id = data['group_id']

    db.sesstion.commit()

    return invite.to_dict()


@invite_route.route('/<int:invite_id>', methods=['DELETE'])
@login_required
def delete_invite(invite_id):
    """
    Delete an invite by id for the logged-in user
    """
    invite = Invites.query.get(invite_id)

    if not invite:
        return { 'message': 'Invite not found'}
    
    if invite.user_id != current_user.id:
        return { 'message': 'Permission denied'}
    
    db.session.delete(invite)
    db.session.commit()

    return { 'message': 'Invite deleted successfully' }