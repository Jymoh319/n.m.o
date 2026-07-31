from datetime import datetime

from extensions import db


class HarvestRecord(db.Model):
    __tablename__ = "harvest_records"

    harvest_id = db.Column(db.Integer, primary_key=True)

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

    batch_code = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    quantity = db.Column(
        db.Float,
        nullable=False
    )

    grade = db.Column(
        db.String(50),
        nullable=False
    )

    method = db.Column(
        db.String(100),
        nullable=False
    )

    status = db.Column(
        db.String(50),
        nullable=False
    )

    harvest_date = db.Column(
        db.Date,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    mining_site = db.relationship(
        "MiningSite",
        back_populates="harvest_records"
    )

    mineral = db.relationship(
        "Mineral",
        back_populates="harvest_records"
    )

    def __repr__(self):
        return (
            f"<HarvestRecord "
            f"{self.batch_code} - "
            f"{self.quantity} tonnes>"
        )