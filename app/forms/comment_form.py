from flask_wtf import FlaskForm
from wtforms import TextField, StringField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    content = TextField('content', validators=[DataRequired()])
    post_id = StringField('post_id', validators=[DataRequired()])
    parent_id = StringField('parent_id')
