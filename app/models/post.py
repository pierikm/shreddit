from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post')
    votes = db.relationship("Vote", back_populates='post')
