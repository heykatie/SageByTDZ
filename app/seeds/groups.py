from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text

# Adds some demo groups, you can add more groups here if you want
def seed_groups():
    group1 = Group(
        event_id=1,
        owner_id=1
    )
    group2 = Group(
        event_id=2,
        owner_id=2
    )
    group3 = Group(
        event_id=3,
        owner_id=3
    )

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the groups table.
# With postgres in production, TRUNCATE removes all the data from the table,
# RESET IDENTITY resets the auto-incrementing primary key, and CASCADE deletes
# any dependent entities. With sqlite3 in development, you must use DELETE
# to remove all data, which also resets primary keys.
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()