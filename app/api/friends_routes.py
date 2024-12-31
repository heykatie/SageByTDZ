from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User, Request, RSVP, Event
from app.api.profile_routes import badges
import datetime

friends_routes = Blueprint('friends', __name__)

@friends_routes.route('/')
@login_required
def friends():
    requests = Request.query.filter(Request.sender_id == current_user.get_id() and Request.receiver_id == current_user.get_id() and Request.accepted == True)
    acceptedReqs = [request for request in requests]
    if acceptedReqs:
        friendIds = [acceptedReq.receiver_id for acceptedReq in acceptedReqs]
        return {'friends': [User.query.get(friendId).to_dict() for friendId in friendIds] }
    return {'errors': {'message': "No friends found"}}

@friends_routes.route('/<int:friend_id>')
@login_required
def friend(friend_id):
    allFriends = friends()['friends']
    if allFriends:
        friend = [friend for friend in allFriends if friend['id'] == friend_id]
        if not friend:
            return {'errors': {'message': "Friend not found"}} 
        return friend
    return {'errors': {'message': "Friend not found"}}
    
@friends_routes.route('/<int:friend_id>/events')
@login_required
def sharedEvents(friend_id):
    targetFriend = friend(friend_id=friend_id)
    if type(targetFriend) == list:
        def friendBadges():
            userId = friend_id
            currentDate = datetime.datetime.now().strftime("%Y-%m-%d")
            rsvps = RSVP.query.filter(RSVP.user_id == userId)
            if rsvps:
                rsvpList = [rsvp.event_id for rsvp in rsvps]
                events = [Event.query.get(eventId) for eventId in rsvpList]
                pastEvents = [event for event in events if currentDate > event.event_date]
                return [event.to_dict() for event in pastEvents]
        if not friendBadges():
            return {'errors': {'message': "No shared events found"}}
        # what to return if there are shared events?
        return badges()
    return {'message': 'Friend not found'}
