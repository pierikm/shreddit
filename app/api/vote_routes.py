from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Post, Vote

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/', methods=["GET"])
def load_votes():
    posts = Post.query.all()
    return {post.id: post.get_votes() for post in posts}

@vote_routes.route('/<int:id>', methods=["DELETE"])
def delete_vote(id):
    vote = Vote.query.get(id)
    db.session.delete(vote)
    db.session.commit()
    return f'{vote.post_id}'
