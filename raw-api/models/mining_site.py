from datetime import datetime

from extensions import db


class MiningSite(db.Model):
    __tablename__ = "mining_sites"

    site_id = db.Column(db.Integer, primary_key=True)

    site_name = db.Column(
        db.String(150),
        nullable=False
    )

    county = db.Column(
        db.String(100),
        nullable=False
    )

    latitude = db.Column(
        db.Numeric(9, 6),
        nullable=False
    )

    longitude = db.Column(
        db.Numeric(9, 6),
        nullable=False
    )

    depth = db.Column(
        db.String(50)
    )

    area = db.Column(
        db.String(50)
    )

    yield_estimate = db.Column(
        db.String(100)
    )

    water_table = db.Column(
        db.String(100)
    )

    status = db.Column(
        db.String(50),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # ---------------- Relationships ----------------

    harvest_records = db.relationship(
        "HarvestRecord",
        back_populates="mining_site",
        cascade="all, delete-orphan"
    )

    certificates = db.relationship(
        "Certificate",
        back_populates="mining_site",
        cascade="all, delete-orphan"
    )

    vehicles = db.relationship(
        "Vehicle",
        back_populates="mining_site",
        cascade="all, delete-orphan"
    )

    shipments = db.relationship(
        "Shipment",
        back_populates="mining_site",
        cascade="all, delete-orphan"
    )

    site_records = db.relationship(
        "SiteRecord",
        back_populates="mining_site",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<MiningSite {self.site_name}>"