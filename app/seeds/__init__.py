from flask.cli import AppGroup
from .users import seed_users, undo_users
from .badges import seed_badges, undo_badges
from .events import seed_events, undo_events
from .categories import seed_categories, undo_categories
from .organizers import seed_organizers, undo_organizers
from .groups import seed_groups, undo_groups

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
        undo_badges()
        undo_events()
        undo_categories()
        undo_organizers()
        undo_groups()
    seed_users()
    seed_badges()
    seed_events()
    seed_categories()
    seed_organizers()
    seed_groups()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_badges()
    undo_events()
    undo_categories()
    undo_organizers()
    undo_groups()
    # Add other undo functions here
