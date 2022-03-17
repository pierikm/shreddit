from flask_wtf import FlaskForm
from wtforms import TextField, IntegerField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    content = TextField('content', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    parent_id = IntegerField('parent_id')
