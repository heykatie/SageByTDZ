from app.models import db, environment, SCHEMA
from app.models.organizer import Organizer
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_organizers():
    redCross = Organizer(
        name='Red Cross',
        description='This is an organizer description.',
        logo='logoURL',
        link='linkURL',
        phone_number='786-306-5050',
        email='redcross@aa.io'
        )
    peta = Organizer(
        name='PETA',
        description='This is an organizer description.',
        logo='logoURL',
        link='linkURL',
        phone_number='222-306-3467',
        email='peta@aa.io'
        )
    blm = Organizer(
        name='BLM',
        description='This is an organizer description.',
        logo='logoURL',
        link='linkURL',
        phone_number='888-546-8907',
        email='blm@aa.io'
        )

    db.session.add(redCross)
    db.session.add(peta)
    db.session.add(blm)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_organizers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.organizers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM organizers"))

    db.session.commit()