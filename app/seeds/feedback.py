from app.models import db, environment, SCHEMA
from app.models.feedback import Feedback
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_feedback():
    feedbackOne = Feedback(
        user_id=2,
        organizer_id=1,
        reaction=1,
        )
    feedbackTwo = Feedback(
        user_id=1,
        organizer_id=3,
        reaction=3,
        )
    feedbackThree = Feedback(
        user_id=3,
        organizer_id=1,
        reaction=2,
        )
    feedbackFour = Feedback(
        user_id=4,
        organizer_id=2,
        reaction=2,
        )
    feedbackFive = Feedback(
        user_id=2,
        organizer_id=3,
        reaction=3,
        )
    feedbackSix = Feedback(
        user_id=5,
        organizer_id=3,
        reaction=1,
        )

    db.session.add(feedbackOne)
    db.session.add(feedbackTwo)
    db.session.add(feedbackThree)
    db.session.add(feedbackFour)
    db.session.add(feedbackFive)
    db.session.add(feedbackSix)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_feedback():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.feedback RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM feedback"))

    db.session.commit()