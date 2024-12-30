from flask import Blueprint, jsonify
from app.models import User, Event, Feedback, RSVP
from flask_login import current_user, login_required
import datetime

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('/')
@login_required
def badges():
    userId = current_user.get_id()
    currentDate = datetime.datetime.now().strftime("%Y-%m-%d")
    rsvps = RSVP.query.filter(RSVP.user_id == userId)
    if rsvps:
        rsvpList = [rsvp.event_id for rsvp in rsvps]
        events = [Event.query.get(eventId) for eventId in rsvpList]
        pastEvents = [event for event in events if currentDate > event.event_date]
        return [event.to_dict() for event in pastEvents]
    return {'errors': {'message': "No RSVPS could be found"}}, 404

@profile_routes.route('/confirm')
@login_required
def rsvps():
    userId = current_user.get_id()
    rsvps = RSVP.query.filter(RSVP.user_id == userId)
    if rsvps:
        rsvpList = [rsvp.event_id for rsvp in rsvps]
        return {'rsvps': [Event.query.get(eventId).to_dict() for eventId in rsvpList]}
    return {'errors': {'message': "No RSVPS could be found"}}, 404

# @profile_routes.route('/edit', methods=["PATCH"])