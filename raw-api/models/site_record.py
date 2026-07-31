from datetime import datetime

from extensions import db


class SiteRecord(db.Model):
    __tablename__ = "site_records"

    record_id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        nullable=False
    )

    site_id = db.Column(
        db.Integer,
        db.ForeignKey("mining_sites.site_id"),
        nullable=False
    )

    mineral_id = db.Column(
        db.Integer,
        db.ForeignKey("minerals.mineral_id"),
        nullable=False
    )

    record_type = db.Column(
        db.String(50),
        nullable=False
    )

    quantity = db.Column(
        db.Float
    )

    record_date = db.Column(
        db.Date,
        nullable=False
    )

    notes = db.Column(
        db.Text
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    user = db.relationship(
        "User",
        back_populates="site_records"
    )

    mining_site = db.relationship(
        "MiningSite",
        back_populates="site_records"
    )

    mineral = db.relationship(
        "Mineral",
        back_populates="site_records"
    )

    def __repr__(self):
        return (
            f"<SiteRecord "
            f"{self.record_type} "
            f"#{self.record_id}>"
        )