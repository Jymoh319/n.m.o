from datetime import datetime

from extensions import db


class Invitation(db.Model):
    __tablename__ = "invitations"

    invitation_id = db.Column(db.Integer, primary_key=True)

    email = db.Column(
        db.String(120),
        nullable=False,
        unique=True
    )

    role = db.Column(
        db.String(50),
        nullable=False
    )

    token = db.Column(
        db.String(255),
        nullable=False,
        unique=True
    )

    accepted = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    expires_at = db.Column(
        db.DateTime,
        nullable=False
    )

    invited_by = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id")
    )