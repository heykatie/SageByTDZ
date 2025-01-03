from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class FeedbackForm(FlaskForm):
    reaction = IntegerField('reaction', validators=[DataRequired()])