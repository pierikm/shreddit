from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Post
from app.forms.post_form import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>/comments', methods=["GET"])
def load_comments(id):
    post = Post.query.get(id)
    return post.get_comments()

@post_routes.route('/', methods=["GET"])
def posts():
    posts = Post.query.all()
    return {post.id: post.to_dict() for post in posts}

@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            user_id=int(current_user.id),
            title=form.data["title"],
            description=form.data["description"],
            image_url=form.data["image_url"]
        )
        db.session.add(post)
        db.session.commit()

        return post.to_dict()

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        setattr(post, 'title', form.data["title"])
        setattr(post, "description", form.data["description"])
        db.session.commit()
        return post.to_dict()

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if post.user_id == current_user.id:
        db.session.delete(post)
        db.session.commit()
        return f'{post.id}'
