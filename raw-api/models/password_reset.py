from datetime import datetime
from extensions import db

class PasswordReset(db.Model):
    __tablename__ = "password_resets"

    password_reset_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    token = db.Column(db.String(255), nullable=False, unique=True)
    used = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)