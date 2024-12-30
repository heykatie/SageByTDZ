from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

# Adds some demo groups, you can add more groups here if you want
def seed_messages():
    message1 = Message(
        user_id=1,
        group_id=1,
        message='This is a message.'
    )
    message2 = Message(
        user_id=1,
        group_id=1,
        message='This is a message.'
    )
    message3 = Message(
        user_id=1,
        group_id=1,
        message='This is a message.'
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the messages table.
# With postgres in production, TRUNCATE removes all the data from the table,
# RESET IDENTITY resets the auto-incrementing primary key, and CASCADE deletes
# any dependent entities. With sqlite3 in development, you must use DELETE
# to remove all data, which also resets primary keys.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()