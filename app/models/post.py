from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))

    user = db.relationship("User", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post')
    votes = db.relationship("Vote", back_populates='post')

    def score(self):
        score = 0
        for vote in self.votes:
            if vote.vote:
                score += 1
            else:
                score -= 1
        return score

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "comments": { comment.id: comment.to_dict() for comment in self.comments },
            "votes": { vote.user_id: vote.to_dict() for vote in self.votes },
            "score": self.score()
        }
