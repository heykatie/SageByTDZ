from flask import Blueprint, jsonify, request
from app.models.db import db
from app.models import User, Event, Group, Message
from flask_login import current_user, login_required
import datetime

message_routes = Blueprint('messages', __name__)
