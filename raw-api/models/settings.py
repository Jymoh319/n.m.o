from extensions import db


class Settings(db.Model):
    __tablename__ = "settings"

    settings_id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        unique=True,
        nullable=False
    )

    email_notifications = db.Column(
        db.Boolean,
        default=True
    )

    shipment_alerts = db.Column(
        db.Boolean,
        default=True
    )

    certification_renewals = db.Column(
        db.Boolean,
        default=False
    )

    royalty_notifications = db.Column(
        db.Boolean,
        default=True
    )

    two_factor_auth = db.Column(
        db.Boolean,
        default=False
    )

    login_alerts = db.Column(
        db.Boolean,
        default=True
    )