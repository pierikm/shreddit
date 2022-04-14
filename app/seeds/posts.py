from datetime import datetime, timezone
from app.models import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo_post = Post(user_id=1,
        title="Does anyone one else like snowboarding or is it just me?",
        create_time=datetime.now(timezone.utc),
        update_time=datetime.now(timezone.utc),
        description="It's so much fun to snowboard. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

    marnie_post = Post(user_id=2,
        title="Does anyone one else like skiing or is it just me?",
        create_time=datetime.now(timezone.utc),
        update_time=datetime.now(timezone.utc),
        description="It's so much fun to ski. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

    bobbie_post = Post(user_id=3,
        title="Does anyone one else like snowboarding and skiing or is it just me?",
        create_time=datetime.now(timezone.utc),
        update_time=datetime.now(timezone.utc),
        description="It's so much fun to snowboard and ski. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

    db.session.add(demo_post)
    db.session.add(marnie_post)
    db.session.add(bobbie_post)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
