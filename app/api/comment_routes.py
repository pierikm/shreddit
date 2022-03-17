from turtle import title
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Comment
from app.forms.comment_form import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=int(current_user.id),
            post_id=form.data["post_id"],
            parent_id=form.data["parent_id"],
            content=form.data["content"]
        )
        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()
