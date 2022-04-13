from turtle import title
from flask import Blueprint, request
from flask_login import current_user, login_required
from sqlalchemy import null
from app.models import db, Comment
from app.forms.comment_form import CommentForm
from app.forms.comment_vote_form import CommentVoteForm
from app.models.comment_vote import CommentVote

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/', methods=["POST"])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=int(current_user.id),
            post_id=int(form.data["post_id"]),
            parent_id=form.data["parent_id"],
            content=form.data["content"]
        )
        db.session.add(comment)
        db.session.commit()
        vote = CommentVote(
                    user_id=int(current_user.id),
                    comment_id=comment.id,
                    vote=True
                )
        db.session.add(vote)
        db.session.commit()

        return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    if comment.user_id == current_user.id:
        setattr(comment, 'content', form.data["content"])
        db.session.commit()
        return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return f'{comment.id}'

@comment_routes.route('/<int:id>/votes', methods=["POST"])
@login_required
def create_vote(id):
    form = CommentVoteForm()
    comment = Comment.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data["vote"] == "true":
            vote = CommentVote(
                user_id=int(current_user.id),
                comment_id=id,
                vote=True
            )
            db.session.add(vote)
            db.session.commit()
            return comment.to_dict()
        else:
            vote = CommentVote(
                user_id=int(current_user.id),
                comment_id=id,
                vote=False
            )
            db.session.add(vote)
            db.session.commit()
            return comment.to_dict()
