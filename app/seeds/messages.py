from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text

# Adds some demo groups, you can add more groups here if you want
def seed_messages():
    message1 = Message(
        user_id=1,
        group_id=1,
        message='Does anyone want to carpool to the food bank this weekend?'
    )
    message2 = Message(
        user_id=2,
        group_id=1,
        message="I’ll be there from 10 AM to 2 PM. Looking forward to seeing everyone!"
    )
    message3 = Message(
        user_id=3,
        group_id=1,
        message="Don’t forget to bring gloves. It gets messy sometimes!"
    )
    message4 = Message(
        user_id=4,
        group_id=2,
        message="We’re organizing a park cleanup on Saturday. Who’s in?"
    )
    message5 = Message(
        user_id=5,
        group_id=2,
        message='I can bring trash bags and gloves for everyone.'
    )
    message6 = Message(
        user_id=6,
        group_id=2,
        message="Count me in! Let’s meet at the south entrance at 9 AM."
    )
    message7 = Message(
        user_id=1,
        group_id=3,
        message='The animal shelter needs volunteers for walking dogs. Anyone interested?'
    )
    message8 = Message(
        user_id=3,
        group_id=3,
        message="I’d love to help! What are the time slots?"
    )
    message9 = Message(
        user_id=6,
        group_id=3,
        message='I can join after lunch.'
    )
    message10 = Message(
        user_id=2,
        group_id=4,
        message="We’re preparing care packages for the homeless next Tuesday. Join us!"
    )
    message11 = Message(
        user_id=5,
        group_id=4,
        message='I can bring some canned goods and toiletries to donate.'
    )
    message12 = Message(
        user_id=4,
        group_id=4,
        message='I can help with packing and organizing the packages!'
    )
    message13 = Message(
        user_id=3,
        group_id=5,
        message='Does anyone have a contact at the local food pantry?'
    )
    message14 = Message(
        user_id=1,
        group_id=5,
        message='I know someone! I can share their info in a bit.'
    )
    message15 = Message(
        user_id=6,
        group_id=5,
        message="Let’s plan a visit to drop off donations this weekend."
    )
    message16 = Message(
        user_id=4,
        group_id=6,
        message="Our tutoring program for kids starts next month. Who's signing up?"
    )
    message17 = Message(
        user_id=2,
        group_id=6,
        message="I’m in! What subjects are we covering?"
    )
    message18 = Message(
        user_id=5,
        group_id=6,
        message='I can help with math and science tutoring.'
    )
    message19 = Message(
        user_id=1,
        group_id=7,
        message="The beach cleanup event is this Sunday. Let’s make it happen!"
    )
    message20 = Message(
        user_id=4,
        group_id=7,
        message="I’ll bring some refreshments for the team!"
    )
    message21 = Message(
        user_id=3,
        group_id=7,
        message='Thanks! I can bring extra sunscreen and trash bags.'
    )
    message22 = Message(
        user_id=2,
        group_id=8,
        message='Does anyone have ideas for our senior center activities next week?'
    )
    message23 = Message(
        user_id=6,
        group_id=8,
        message='We could organize a painting session or a trivia game.'
    )
    message24 = Message(
        user_id=5,
        group_id=8,
        message='Great idea! I can bring some supplies for painting.'
    )
    message25 = Message(
        user_id=1,
        group_id=9,
        message="We’re assembling hygiene kits this Friday. Anyone want to help?"
    )
    message26 = Message(
        user_id=3,
        group_id=9,
        message="I’ll help! Do we have a list of what’s needed?"
    )
    message27 = Message(
        user_id=4,
        group_id=9,
        message='Yes, I can share the list with the group.'
    )
    message28 = Message(
        user_id=6,
        group_id=10,
        message='Our blood donation drive needs more volunteers. Can anyone join?'
    )
    message29 = Message(
        user_id=2,
        group_id=10,
        message="I’m available. Where should we meet?"
    )
    message30 = Message(
        user_id=5,
        group_id=10,
        message="It’s at the community center next to Target. Let’s meet there at 10 AM."
    )

    db.session.add_all([
        message1, message2, message3, message4, message5, message6,
        message7, message8, message9, message10, message11, message12,
        message13, message14, message15, message16, message17, message18,
        message19, message20, message21, message22, message23, message24,
        message25, message26, message27, message28, message29, message30
    ])
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