from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextField('count', validators=[DataRequired()])
