from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.vote_form import VoteForm
from app.models import db, Post, Vote, post

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/', methods=["GET"])
def load_votes():
    posts = Post.query.all()
    return {post.id: post.get_votes() for post in posts}

@vote_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_vote(id):
    form = VoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    vote = Vote.query.get(id)

    if vote.user_id == current_user.id and form.validate_on_submit():
        if form.data['vote'] == 'true':
            setattr(vote, 'vote', True)
            db.session.commit()
        else:
            setattr(vote, 'vote', False)
            db.session.commit()
    post = Post.query.get(vote.post_id)
    return post.to_dict()

@vote_routes.route('/<int:id>', methods=["DELETE"])
def delete_vote(id):
    vote = Vote.query.get(id)
    post = Post.query.get(vote.post_id)
    db.session.delete(vote)
    db.session.commit()
    return post.to_dict()
