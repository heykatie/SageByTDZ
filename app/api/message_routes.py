from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Event, Group, Message
from flask_login import current_user, login_required
import datetime

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:messageId>', methods=['PUT'])
@login_required
def edit_messages(messageId):
    message = Message.query.get(messageId)
    if not message or not message.user_id == current_user.get_id():
        return { 'errors': { 'message': 'No message found.' } }

    data = request.get_json()
    editedMessage = data.get("message")

    message.message = editedMessage
    message.updated_at = datetime.datetime.now().strftime("%H:%M:%S")
    db.session.commit()
    return message.to_dict()

@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(messageId):
    message = Message.query.get(messageId)
    if not message or not message.user_id == current_user.get_id():
        return { 'errors': { 'message': 'No message found.' } }

    db.session.delete(message)
    db.session.commit()
    return { 'message': 'Message successfully deleted.' }

# @message_routes.route('/', methods=['POST'])
# @login_required
# def create_message():
