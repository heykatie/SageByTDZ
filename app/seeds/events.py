from app.models import db, environment, SCHEMA
from app.models.event import Event
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_events():
    beachCleanUp = Event(
        title='Beach Clean Up',
        description='This an event description.',
        organizer_id=1,
        categories="Outdoors, Climate Change",
        address='3456 University Dr.',
        city='Houston',
        state='Texas',
        event_date='2025-01-10',
        start_time='8:00:00',
        end_time='14:00:00',
        badge_url='badgeOneURL',
        preview='previewImageURL'
        )
    xmasToyDrive = Event(
        title='XMAS Toy Drive',
        description='This an event description.',
        organizer_id=3,
        categories='Indoors, Virtual',
        address='6708 Mountainview Cirle',
        city='Salt Lake City',
        state='Utah',
        event_date='2024-12-19',
        start_time='10:30:00',
        end_time='16:30:00',
        badge_url='badgeTwoURL',
        preview='previewImageURL'
        )
    soupKitchen = Event(
        title='Soup Kitchen',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2025-01-06',
        start_time='7:00:00',
        end_time='20:15:00',
        badge_url='badgeThreeURL',
        preview='previewImageURL'
        )

    db.session.add(beachCleanUp)
    db.session.add(xmasToyDrive)
    db.session.add(soupKitchen)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_events():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
