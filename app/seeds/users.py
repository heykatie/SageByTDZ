<<<<<<< HEAD
from app.models import db, User, environment, SCHEMA
=======
from app.models import db, environment, SCHEMA
from app.models.badge import Badge
>>>>>>> e957a35 (restructured directories based on project starter to simplify docker - Files: .dockerignore .env.example .gitignore Dockerfile Pipfile Pipfile.lock README.md app/__init__.py app/api/auth_routes.py app/api/user_routes.py app/config.py app/forms/__init__.py app/forms/login_form.py app/forms/signup_form.py app/models/__init__.py app/models/db.py app/models/user.py app/seeds/__init__.py app/seeds/users.py backend/README.md migrations/README migrations/alembic.ini migrations/env.py migrations/script.py.mako migrations/versions/20201120_150602_create_users_table.py react-vite/.eslintrc.cjs react-vite/.gitignore react-vite/README.md react-vite/dist/assets/index-992ded45.js react-vite/dist/assets/index-b2cdddb1.css react-vite/dist/favicon.ico react-vite/dist/index.html react-vite/index.html react-vite/package.json react-vite/public/favicon.ico react-vite/src/components/LoginFormModal/LoginForm.css react-vite/src/components/LoginFormModal/LoginFormModal.jsx react-vite/src/components/LoginFormModal/index.js react-vite/src/components/LoginFormPage/LoginForm.css react-vite/src/components/LoginFormPage/LoginFormPage.jsx react-vite/src/components/LoginFormPage/index.js react-vite/src/components/Navigation/Navigation.css react-vite/src/components/Navigation/Navigation.jsx react-vite/src/components/Navigation/OpenModalMenuItem.jsx react-vite/src/components/Navigation/ProfileButton.jsx react-vite/src/components/Navigation/index.js react-vite/src/components/OpenModalButton/OpenModalButton.jsx react-vite/src/components/OpenModalButton/index.js react-vite/src/components/SignupFormModal/SignupForm.css react-vite/src/components/SignupFormModal/SignupFormModal.jsx react-vite/src/components/SignupFormModal/index.js react-vite/src/components/SignupFormPage/SignupForm.css react-vite/src/components/SignupFormPage/SignupFormPage.jsx react-vite/src/components/SignupFormPage/index.js react-vite/src/context/Modal.css react-vite/src/context/Modal.jsx react-vite/src/index.css react-vite/src/main.jsx react-vite/src/redux/session.js react-vite/src/redux/store.js react-vite/src/router/Layout.jsx react-vite/src/router/index.jsx react-vite/vite.config.js requirements.txt)
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
<<<<<<< HEAD
def seed_users():
    cam = User(
        username='KingCam', firstName='Cam', lastName='Williamson', email='cam@aa.io', password='password', city='Houston', state='Texas', address='3456 University Dr.', )
    jen = User(
        username='JenniBear', firstName='Jen', lastName='Jenkins', email='jen@aa.io', password='password1', city='Salt Lake City', state='Utah', address='6708 Mountainview Cirle',)
    sydney = User(
        username='SydKid', firstName='Sydney', lastName='Sydneyson', email='sydney@aa.io', password='password2', city='New York', state='New York', address='2367 Apple St. Apt 4B', badge_id=1)

    db.session.add(cam)
    db.session.add(jen)
    db.session.add(sydney)
=======
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
>>>>>>> e957a35 (restructured directories based on project starter to simplify docker - Files: .dockerignore .env.example .gitignore Dockerfile Pipfile Pipfile.lock README.md app/__init__.py app/api/auth_routes.py app/api/user_routes.py app/config.py app/forms/__init__.py app/forms/login_form.py app/forms/signup_form.py app/models/__init__.py app/models/db.py app/models/user.py app/seeds/__init__.py app/seeds/users.py backend/README.md migrations/README migrations/alembic.ini migrations/env.py migrations/script.py.mako migrations/versions/20201120_150602_create_users_table.py react-vite/.eslintrc.cjs react-vite/.gitignore react-vite/README.md react-vite/dist/assets/index-992ded45.js react-vite/dist/assets/index-b2cdddb1.css react-vite/dist/favicon.ico react-vite/dist/index.html react-vite/index.html react-vite/package.json react-vite/public/favicon.ico react-vite/src/components/LoginFormModal/LoginForm.css react-vite/src/components/LoginFormModal/LoginFormModal.jsx react-vite/src/components/LoginFormModal/index.js react-vite/src/components/LoginFormPage/LoginForm.css react-vite/src/components/LoginFormPage/LoginFormPage.jsx react-vite/src/components/LoginFormPage/index.js react-vite/src/components/Navigation/Navigation.css react-vite/src/components/Navigation/Navigation.jsx react-vite/src/components/Navigation/OpenModalMenuItem.jsx react-vite/src/components/Navigation/ProfileButton.jsx react-vite/src/components/Navigation/index.js react-vite/src/components/OpenModalButton/OpenModalButton.jsx react-vite/src/components/OpenModalButton/index.js react-vite/src/components/SignupFormModal/SignupForm.css react-vite/src/components/SignupFormModal/SignupFormModal.jsx react-vite/src/components/SignupFormModal/index.js react-vite/src/components/SignupFormPage/SignupForm.css react-vite/src/components/SignupFormPage/SignupFormPage.jsx react-vite/src/components/SignupFormPage/index.js react-vite/src/context/Modal.css react-vite/src/context/Modal.jsx react-vite/src/index.css react-vite/src/main.jsx react-vite/src/redux/session.js react-vite/src/redux/store.js react-vite/src/router/Layout.jsx react-vite/src/router/index.jsx react-vite/vite.config.js requirements.txt)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
<<<<<<< HEAD
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
=======
def undo_badges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM badges"))

    db.session.commit()
>>>>>>> e957a35 (restructured directories based on project starter to simplify docker - Files: .dockerignore .env.example .gitignore Dockerfile Pipfile Pipfile.lock README.md app/__init__.py app/api/auth_routes.py app/api/user_routes.py app/config.py app/forms/__init__.py app/forms/login_form.py app/forms/signup_form.py app/models/__init__.py app/models/db.py app/models/user.py app/seeds/__init__.py app/seeds/users.py backend/README.md migrations/README migrations/alembic.ini migrations/env.py migrations/script.py.mako migrations/versions/20201120_150602_create_users_table.py react-vite/.eslintrc.cjs react-vite/.gitignore react-vite/README.md react-vite/dist/assets/index-992ded45.js react-vite/dist/assets/index-b2cdddb1.css react-vite/dist/favicon.ico react-vite/dist/index.html react-vite/index.html react-vite/package.json react-vite/public/favicon.ico react-vite/src/components/LoginFormModal/LoginForm.css react-vite/src/components/LoginFormModal/LoginFormModal.jsx react-vite/src/components/LoginFormModal/index.js react-vite/src/components/LoginFormPage/LoginForm.css react-vite/src/components/LoginFormPage/LoginFormPage.jsx react-vite/src/components/LoginFormPage/index.js react-vite/src/components/Navigation/Navigation.css react-vite/src/components/Navigation/Navigation.jsx react-vite/src/components/Navigation/OpenModalMenuItem.jsx react-vite/src/components/Navigation/ProfileButton.jsx react-vite/src/components/Navigation/index.js react-vite/src/components/OpenModalButton/OpenModalButton.jsx react-vite/src/components/OpenModalButton/index.js react-vite/src/components/SignupFormModal/SignupForm.css react-vite/src/components/SignupFormModal/SignupFormModal.jsx react-vite/src/components/SignupFormModal/index.js react-vite/src/components/SignupFormPage/SignupForm.css react-vite/src/components/SignupFormPage/SignupFormPage.jsx react-vite/src/components/SignupFormPage/index.js react-vite/src/context/Modal.css react-vite/src/context/Modal.jsx react-vite/src/index.css react-vite/src/main.jsx react-vite/src/redux/session.js react-vite/src/redux/store.js react-vite/src/router/Layout.jsx react-vite/src/router/index.jsx react-vite/vite.config.js requirements.txt)
