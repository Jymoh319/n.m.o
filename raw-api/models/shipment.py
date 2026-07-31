from datetime import datetime

from extensions import db


class Shipment(db.Model):
    __tablename__ = "shipments"

    shipment_id = db.Column(db.Integer, primary_key=True)

    site_id = db.Column(
        db.Integer,
        db.ForeignKey("mining_sites.site_id"),
        nullable=False
    )

    vehicle_id = db.Column(
        db.Integer,
        db.ForeignKey("vehicles.vehicle_id"),
        nullable=False
    )

    shipment_code = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    origin = db.Column(
        db.String(150),
        nullable=False
    )

    destination = db.Column(
        db.String(150),
        nullable=False
    )

    cargo = db.Column(
        db.String(150),
        nullable=False
    )

    quantity = db.Column(
        db.Float,
        nullable=False
    )

    vessel = db.Column(
        db.String(150),
        nullable=False
    )

    shipment_date = db.Column(
        db.Date,
        nullable=False
    )

    estimated_arrival = db.Column(
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
        back_populates="shipments"
    )

    vehicle = db.relationship(
        "Vehicle",
        back_populates="shipments"
    )

    def __repr__(self):
        return (
            f"<Shipment "
            f"{self.shipment_code} - "
            f"{self.destination}>"
        )