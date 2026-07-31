from extensions import ma
from models.shipment import Shipment
from schemas.vehicle_schema import VehicleSchema


class ShipmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Shipment
        load_instance = True
        include_fk = True

    shipment_id = ma.auto_field(dump_only=True)

    site_id = ma.auto_field(required=True)
    vehicle_id = ma.auto_field(required=True)
    vehicle = ma.Nested(VehicleSchema, dump_only=True)

    shipment_code = ma.auto_field(required=True)

    origin = ma.auto_field(required=True)
    destination = ma.auto_field(required=True)

    cargo = ma.auto_field(required=True)
    quantity = ma.auto_field(required=True)

    vessel = ma.auto_field(required=True)

    shipment_date = ma.auto_field(required=True)
    estimated_arrival = ma.auto_field(required=True)

    status = ma.auto_field(required=True)

    created_at = ma.auto_field(dump_only=True)


shipment_schema = ShipmentSchema()
shipments_schema = ShipmentSchema(many=True)