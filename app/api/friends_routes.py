from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Request

friends_routes = Blueprint('friends', __name__)

@friends_routes.route('/')
@login_required
def friends():
    requests = Request.query.filter(Request.sender_id == current_user.get_id(), Request.accepted == True)
    acceptedReqs = [request for request in requests]
    friendIds = [acceptedReq.receiver_id for acceptedReq in acceptedReqs]
    return {'friends': [User.query.get(friendId).to_dict() for friendId in friendIds] }