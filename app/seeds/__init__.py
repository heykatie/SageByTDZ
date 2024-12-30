from flask.cli import AppGroup
from .users import seed_users, undo_users
from .feedback import seed_feedback, undo_feedback
from .events import seed_events, undo_events
from .organizers import seed_organizers, undo_organizers
from .rsvps import seed_rsvps, undo_rsvps
from .groups import seed_groups, undo_groups
from .invites import seed_invites, undo_invites
from .messages import seed_messages, undo_messages
from .requests import seed_requests, undo_requests
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_feedback()
        undo_events()
        undo_organizers()
        undo_rsvps()
        undo_groups()
        undo_invites()
        undo_messages()
        undo_requests()
    seed_users()
    seed_feedback()
    seed_events()
    seed_organizers()
    seed_rsvps()
    seed_groups()
    seed_invites()
    seed_messages()
    seed_requests()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_feedback()
    undo_events()
    undo_organizers()
    undo_rsvps()
    undo_groups()
    undo_invites()
    undo_messages()
    undo_requests()
    # Add other undo functions here
