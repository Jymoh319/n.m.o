from datetime import datetime

from extensions import db


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    vehicle_id = db.Column(db.Integer, primary_key=True)

    site_id = db.Column(
        db.Integer,
        db.ForeignKey("mining_sites.site_id"),
        nullable=False
    )

    registration_number = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    vehicle_type = db.Column(
        db.String(100),
        nullable=False
    )

    capacity = db.Column(
        db.Float,
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


    shipments = db.relationship(
        "Shipment",
        back_populates="vehicle",
        cascade="all, delete-orphan"
    )

    mining_site = db.relationship(
        "MiningSite",
        back_populates="vehicles"
    )

    shipments = db.relationship(
        "Shipment",
        back_populates="vehicle",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return (
            f"<Vehicle "
            f"{self.registration_number}>"
        )