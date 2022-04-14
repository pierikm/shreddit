from datetime import datetime, timedelta
from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    create_time = db.Column(db.DateTime(timezone=True), nullable=False)
    update_time = db.Column(db.DateTime(timezone=True), nullable=False)

    user = db.relationship("User", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post', cascade="all, delete-orphan")
    votes = db.relationship("Vote", back_populates='post', cascade="all, delete-orphan")

    def score(self):
        score = 0
        for vote in self.votes:
            if vote.vote:
                score += 1
            else:
                score -= 1
        return score

    def get_comments(self):
        return { comment.id: comment.to_dict() for comment in self.comments }

    def get_votes(self):
        return { vote.user_id: vote.to_dict() for vote in self.votes }

    def get_timestamp(self, now):
        # print("*********", now)
        dif = now - self.create_time
        print("*********", type(dif))
        if dif < timedelta(minutes=1):
            return 'less than a minute ago'
        elif dif < timedelta(hours=1):
            return f'{int(dif.seconds / 60)} minutes ago'
        elif dif < timedelta(days=1):
            return f'{int(dif.seconds / 3600)} hours ago'
        elif dif < timedelta(months=1):
            return f'{int(dif.days)} ago'
        elif dif < timedelta(years=1):
            return f'{int(dif.days / 365)} ago'
        return 'now'

    def to_dict(self, now):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "comments": { comment.id: comment.to_dict() for comment in self.comments },
            "votes": { vote.user_id: vote.to_dict() for vote in self.votes },
            "score": self.score(),
            "timestamp": self.get_timestamp(now)
        }
