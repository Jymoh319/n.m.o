from extensions import db


class Mineral(db.Model):
    __tablename__ = "minerals"

    mineral_id = db.Column(db.Integer, primary_key=True)
    mineral_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    unit = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)

    harvest_records = db.relationship(
        "HarvestRecord",
        back_populates="mineral",
        cascade="all, delete-orphan"
    )

    site_records = db.relationship(
        "SiteRecord",
        back_populates="mineral",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Mineral {self.mineral_name}>"