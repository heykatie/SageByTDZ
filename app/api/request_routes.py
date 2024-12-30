from flask import Blueprint, jsonify, request
from app.models import User, Request
from flask_login import current_user, login_required
import datetime

request_routes = Blueprint('requests', __name__)