from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Event, Group, Message
from flask_login import current_user, login_required
import datetime

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_messages():

@message_routes.route('/', methods=['POST'])
@login_required
def create_message():

@message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_message():