from tokenize import Comment
from flask import Blueprint, request
from flask_login import current_user, login_required
from datetime import datetime, timezone
from app.forms.comment_vote_form import CommentVoteForm
from app.models import db, CommentVote, Comment

comment_vote_routes = Blueprint('comment_votes', __name__)

# @vote_routes.route('/', methods=["GET"])
# def load_votes():
#     posts = Post.query.all()
#     return {post.id: post.get_votes() for post in posts}

@comment_vote_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_vote(id):
    form = CommentVoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    vote = CommentVote.query.get(id)
    now = datetime.now(timezone.utc)

    if vote.user_id == current_user.id and form.validate_on_submit():
        if form.data['vote'] == 'true':
            setattr(vote, 'vote', True)
            db.session.commit()
        else:
            setattr(vote, 'vote', False)
            db.session.commit()
    comment = Comment.query.get(vote.comment_id)
    return comment.to_dict(now)

@comment_vote_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_vote(id):
    now = datetime.now(timezone.utc)
    vote = CommentVote.query.get(id)
    comment = Comment.query.get(vote.comment_id)
    db.session.delete(vote)
    db.session.commit()
    return comment.to_dict(now)
