from datetime import datetime

from extensions import db


class Certificate(db.Model):
    __tablename__ = "certificates"

    certificate_id = db.Column(db.Integer, primary_key=True)

    site_id = db.Column(
        db.Integer,
        db.ForeignKey("mining_sites.site_id"),
        nullable=False
    )

    certificate_number = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    certificate_name = db.Column(
        db.String(150),
        nullable=False
    )

    category = db.Column(
        db.String(100),
        nullable=False
    )

    issuer = db.Column(
        db.String(150),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    issued_date = db.Column(
        db.Date,
        nullable=False
    )

    expiry_date = db.Column(
        db.Date,
        nullable=False
    )

    status = db.Column(
        db.String(50),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )



    mining_site = db.relationship(
        "MiningSite",
        back_populates="certificates"
    )

    def __repr__(self):
        return (
            f"<Certificate "
            f"{self.certificate_number} - "
            f"{self.certificate_name}>"
        )