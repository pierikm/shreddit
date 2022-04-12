from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CommentVoteForm(FlaskForm):
    vote = StringField('vote', validators=[DataRequired()])