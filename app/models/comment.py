from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    parent_id = db.Column(db.Integer)
    content = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates='comments')
    post = db.relationship("Post", back_populates='comments')
    votes = db.relationship("CommentVote", back_populates='comment')

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
            "user": self.user.to_dict(),
            "parent_id": self.parent_id,
            "content": self.content,
            "score": self.score(),
            "votes": { vote.user_id: vote.to_dict() for vote in self.votes },
        }
