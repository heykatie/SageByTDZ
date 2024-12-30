from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    cam = User(
        username='KingCam',
        firstName='Cam',
        lastName='Williamson',
        email='cam@aa.io',
        password='password',
        city='Houston',
        state='Texas',
        address='3456 University Dr.',
        )
    jen = User(
        username='JenniBear',
        firstName='Jen',
        lastName='Jenkins',
        email='jen@aa.io',
        password='password1',
        city='Salt Lake City',
        state='Utah',
        address='6708 Mountainview Cirle',
        )
    sydney = User(
        username='SydKid',
        firstName='Sydney',
        lastName='Sydneyson',
        email='sydney@aa.io',
        password='password2',
        city='New York',
        state='New York',
        address='2367 Apple St. Apt 4B',
        )

    db.session.add(cam)
    db.session.add(jen)
    db.session.add(sydney)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
