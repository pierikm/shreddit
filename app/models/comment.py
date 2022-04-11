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

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "parent_id": self.parent_id,
            "content": self.content
        }
