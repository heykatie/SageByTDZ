from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    cam = User(
        username='KingCam',
        first_name='Cam',
        last_name='Williamson',
        email='cam@aa.io',
        password='password',
        city='Houston',
        state='Texas',
        address='3456 University Dr.',
        )
    jen = User(
        username='JenniBear',
        first_name='Jen',
        last_name='Jenkins',
        email='jen@aa.io',
        password='password1',
        city='Salt Lake City',
        state='Utah',
        address='6708 Mountainview Cirle',
        )
    sydney = User(
        username='SydKid',
        first_name='Sydney',
        last_name='Sydneyson',
        email='sydney@aa.io',
        password='password2',
        city='New York',
        state='New York',
        address='2367 Apple St. Apt 4B',
        )
    sarah = User(
        username = 'MissSarah',
        first_name = 'Sarah',
        last_name = 'Smiles',
        email = 'sarah@aa.io',
        password = 'password3',
        city = 'New York',
        state = 'New York',
        address = '123 My St. Apt 1'
    )
    theo = User(
        username = 'TioTheo',
        first_name = 'Theo',
        last_name = 'Smithe',
        email = 'theo@aa.io',
        password = 'password4',
        city = 'Sandy',
        state = 'Utah',
        address = '12345 My St. Apt 1'
    )
    jerry = User(
        username = 'JerJer',
        first_name = 'Jerry',
        last_name = 'Sands',
        email = 'jerry@aa.io',
        password = 'password5',
        city = 'Sandy',
        state = 'Oregon',
        address = '1234 My St. Apt 1'
    )

    db.session.add(cam)
    db.session.add(jen)
    db.session.add(sydney)
    db.session.add(sarah)
    db.session.add(theo)
    db.session.add(jerry)
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
