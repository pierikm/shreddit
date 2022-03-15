from .db import db

class Vote(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_id = db.Column(db.Integer, nullable=False)
    vote = db.Columhn(db.Boolean, nullable=False)
    description = db.Column(db.Text, nullable=False)
