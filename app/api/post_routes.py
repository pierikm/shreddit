from flask import Blueprint, request
from flask_login import current_user, login_required
from datetime import datetime, timezone, time, tzinfo
from app.models import db, Post, Vote
from app.forms.post_form import PostForm
from app.forms.vote_form import VoteForm
from app.models.vote import Vote

post_routes = Blueprint('posts', __name__)

@post_routes.route('/', methods=["GET"])
def load_posts():
    now = datetime.now(timezone.utc)
    posts = Post.query.all()
    return {post.id: post.to_dict(now) for post in posts}

@post_routes.route('/<int:id>', methods=["GET"])
def loads_single_post(id):
    now = datetime.now(timezone.utc)
    post = Post.query.get(id)
    return post.to_dict(now)

@post_routes.route('/<int:id>/comments', methods=["GET"])
def load_comments(id):
    post = Post.query.get(id)
    return post.get_comments()

@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        now = datetime.now(timezone.utc)
        post = Post(
            user_id=int(current_user.id),
            title=form.data["title"],
            description=form.data["description"],
            image_url=form.data["image_url"],
            create_time=datetime.now(timezone.utc),
            update_time=datetime.now(timezone.utc)
        )
        db.session.add(post)
        db.session.commit()
        vote = Vote(
            user_id=int(current_user.id),
            post_id=post.id,
            vote=True
        )
        db.session.add(vote)
        db.session.commit()

        return post.to_dict(now)

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        now = datetime.now(timezone.utc)
        setattr(post, 'title', form.data["title"])
        setattr(post, "description", form.data["description"])
        setattr(post, "update_time", datetime.now(timezone.utc))
        db.session.commit()
        return post.to_dict(now)

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return f'{post.id}'

@post_routes.route('/<int:id>/votes', methods=["POST"])
@login_required
def create_vote(id):
    form = VoteForm()
    post = Post.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        now = datetime.now(timezone.utc)
        if form.data["vote"] == "true":
            vote = Vote(
                user_id=int(current_user.id),
                post_id=id,
                vote=True
            )
            db.session.add(vote)
            db.session.commit()
            return post.to_dict(now)
        else:
            vote = Vote(
                user_id=int(current_user.id),
                post_id=id,
                vote=False
            )
            db.session.add(vote)
            db.session.commit()
            return post.to_dict(now)
