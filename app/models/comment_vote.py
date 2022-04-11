from xml.etree.ElementTree import Comment
from .db import db

class CommentVote(db.Model):
    __tablename__ = 'comment_votes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    vote = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="comment_votes")
    comment = db.relationship("Comment", back_populates="votes")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "vote": self.vote,
        }
