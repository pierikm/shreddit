from .db import db

class Vote(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    vote = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="votes")
    post = db.relationship("Post", back_populates="votes")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "vote": self.vote,
        }
