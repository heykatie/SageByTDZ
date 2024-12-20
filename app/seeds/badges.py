from app.models import db, environment, SCHEMA
from app.models.badge import Badge
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_badges():
    beachCleanUpBadge = Badge(
        url='badgeOneURL', event_id=1)
    soupKitchenBadge = Badge(
        url='badgeTwoURL', event_id=3)
    xmasToyDriveBadge = Badge(
        url='badgeThreeURL', event_id=2)
    db.session.add(beachCleanUpBadge)
    db.session.add(soupKitchenBadge)
    db.session.add(xmasToyDriveBadge)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_badges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM badges"))

    db.session.commit()