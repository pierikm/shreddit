from datetime import timedelta
from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    parent_id = db.Column(db.Integer)
    content = db.Column(db.Text, nullable=False)
    create_time = db.Column(db.DateTime(timezone=True), nullable=False)
    update_time = db.Column(db.DateTime(timezone=True), nullable=False)

    user = db.relationship("User", back_populates='comments')
    post = db.relationship("Post", back_populates='comments')
    votes = db.relationship("CommentVote", back_populates='comment', cascade="all, delete-orphan")

    def score(self):
        score = 0
        for vote in self.votes:
            if vote.vote:
                score += 1
            else:
                score -= 1
        return score

    def get_timestamp(self, now):
        dif = now - self.create_time
        if dif < timedelta(minutes=1):
            return 'less than a minute ago'
        elif dif < timedelta(hours=1):
            if(int(dif.seconds / 60) == 1):
                return '1 minute ago'
            return f'{int(dif.seconds / 60)} minutes ago'
        elif dif < timedelta(days=1):
            if(int(dif.seconds / 3600) == 1):
                return '1 hour ago'
            return f'{int(dif.seconds / 3600)} hours ago'
        elif dif < timedelta(months=1):
            if(int(dif.days) == 1):
                return '1 day ago'
            return f'{int(dif.days)} days ago'
        elif dif < timedelta(years=1):
            if(int(dif.days) / 30 == 1):
                return '1 month ago'
            return f'{int(dif.days / 30)} months ago'
        else:
            if(int(dif.days) / 365 == 1):
                return '1 year ago'
            return f'{int(dif.days / 365)} years ago'

    def to_dict(self, now):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "parent_id": self.parent_id,
            "content": self.content,
            "score": self.score(),
            "votes": { vote.user_id: vote.to_dict() for vote in self.votes },
            "timestamp": self.get_timestamp(now)
        }
