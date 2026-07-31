from datetime import datetime

from flask_bcrypt import check_password_hash

from extensions import bcrypt, db


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)

    username = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(50),
        nullable=False,
        default="worker"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    site_records = db.relationship(
        "SiteRecord",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    @property
    def password(self):
        raise AttributeError("Password cannot be read.")

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(
            password
        ).decode("utf-8")

    def verify_password(self, password):
        return check_password_hash(
            self.password_hash,
            password
        )

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "created_at": self.created_at.isoformat()
            if self.created_at
            else None
        }

    def __repr__(self):
        return f"<User {self.username}>"