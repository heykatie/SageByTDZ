from flask import Blueprint, jsonify, request
from app.models import User, Event, Feedback, RSVP
from app.forms import ProfileForm
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

@profile_routes.route('/edit', methods=["PATCH"])
@login_required
def edit_profile():
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        userId = current_user.get_id()
        user = User.query.get(userId)

        user.username = form.data['username']
        user.email = form.data['email']
        user.password = form.data['password']
        user.address = form.data['address']
        user.city = form.data['city']
        user.state = form.data['state']

        db.session.commit()
        return user.to_dict()
    return form.errors, 401