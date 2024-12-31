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
        categories='Indoors, Donation, Handicap Accessible',
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
    puppyCarWash = Event(
        title='Puppy Car Wash',
        description='This an event description.',
        organizer_id=2,
        categories='Outdoors, Handicap Accessible, Animal Adoption',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2024-01-06',
        start_time='10:00:00',
        end_time='12:30:00',
        badge_url='badgeFourURL',
        preview='previewImageURL'
        )
    helpingHands = Event(
        title='Helping Hands',
        description='This an event description.',
        organizer_id=2,
        categories='Outdoors, Commnity Development, Physical',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2024-05-23',
        start_time='8:00:00',
        end_time='17:00:00',
        badge_url='badgeFiveURL',
        preview='previewImageURL'
        )
    kidsTheatre = Event(
        title='Kids Theatre',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2024-10-06',
        start_time='17:30:00',
        end_time='20:00:00',
        badge_url='badgeSixURL',
        preview='previewImageURL'
        )
    communityGarden = Event(
        title='Community Garden',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible, Community Development',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2025-01-06',
        start_time='7:00:00',
        end_time='20:15:00',
        badge_url='badgeSevenURL',
        preview='previewImageURL'
        )
    bigBrotherBigSister = Event(
        title='Big Brother Big Sister',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible, Virtual',
        address='None',
        city='None',
        state='None',
        event_date='2025-02-10',
        start_time='15:00:00',
        end_time='17:15:00',
        badge_url='badgeEightURL',
        preview='previewImageURL'
        )
    readToTheElderly = Event(
        title='Read to the Elderly',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2025-09-04',
        start_time='7:00:00',
        end_time='20:15:00',
        badge_url='badgeNineURL',
        preview='previewImageURL'
        )
    holidayHotline = Event(
        title='Holiday Hotline',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Crisis Relief, Virtual',
         address='None',
        city='None',
        state='None',
        event_date='2024-12-25',
        start_time='6:00:00',
        end_time='23:55:00',
        badge_url='badgeTenURL',
        preview='previewImageURL'
        )
    disasterRelief = Event(
        title='Disater Relief',
        description='This an event description.',
        organizer_id=2,
        categories='Outdoors, Crisis Relief',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2025-11-09',
        start_time='15:00:00',
        end_time='18:00:00',
        badge_url='badgeElevenURL',
        preview='previewImageURL'
        )
    clothingDrive = Event(
        title='Clothing Drive',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible, Donation',
         address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2024-03-11',
        start_time='7:00:00',
        end_time='20:15:00',
        badge_url='badgeTwelveURL',
        preview='previewImageURL'
        )
    catDates = Event(
        title='Cat Dates',
        description='This an event description.',
        organizer_id=2,
        categories='Indoors, Handicap Accessible, Animal Adoption',
        address='2367 Apple St. Apt 4B',
        city='New York',
        state='New York',
        event_date='2025-05-14',
        start_time='10:00:00',
        end_time='17:00:00',
        badge_url='badgeThirteenURL',
        preview='previewImageURL'
        )

    db.session.add(beachCleanUp)
    db.session.add(xmasToyDrive)
    db.session.add(soupKitchen)
    db.session.add(puppyCarWash)
    db.session.add(helpingHands)
    db.session.add(kidsTheatre)
    db.session.add(communityGarden)
    db.session.add(bigBrotherBigSister)
    db.session.add(readToTheElderly)
    db.session.add(holidayHotline)
    db.session.add(disasterRelief)
    db.session.add(clothingDrive)
    db.session.add(catDates)
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
