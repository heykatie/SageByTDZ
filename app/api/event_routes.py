from flask import Blueprint, jsonify
from app.models import Event, Organizer, Feedback, RSVP, User

event_routes = Blueprint('events', __name__)

@event_routes.route('/')
def events():
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}

@event_routes.route('/<int:id>')
def event(id):
    event = Event.query.get(id)
    if event:
        organizer = Organizer.query.get(event.organizer_id)
        feedback = Feedback.query.filter(Feedback.organizer_id == organizer.id)
        feedbackList = [feedback.reaction for feedback in feedback]
        rsvps = RSVP.query.filter(RSVP.event_id == id)
        rsvpList = [rsvp.user_id for rsvp in rsvps]
        def avgFeedback(feedbackList):
            feedback_count = list(feedbackList.count(3), feedback_count(2), feedback_count(1) )
            mode = max(feedback_count)
            if mode == feedback_count[0]: return 2
            if mode == feedback_count[1]: return 1
            return 1

        return {
        'event': event.to_dict(),
        'organizer': organizer.to_dict(),
        'avgFeedback': avgFeedback(feedbackList),
        'rsvps': [User.query.get(userId).firstName for userId in rsvpList]
        }
    return {'errors': {'message': "Event couldn't be found"}}, 404