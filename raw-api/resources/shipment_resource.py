from flask import request
from flask_restful import Resource

from extensions import db
from models.shipment import Shipment
from schemas.shipment_schema import (
    shipment_schema,
    shipments_schema
)


class ShipmentListResource(Resource):
    def get(self):
        shipments = Shipment.query.all()
        return shipments_schema.dump(shipments), 200

    def post(self):
        data = request.get_json()

        shipment = Shipment(
            site_id=data["site_id"],
            vehicle_id=data["vehicle_id"],
            shipment_code=data["shipment_code"],
            origin=data["origin"],
            destination=data["destination"],
            cargo=data["cargo"],
            quantity=data["quantity"],
            vessel=data["vessel"],
            shipment_date=data["shipment_date"],
            estimated_arrival=data["estimated_arrival"],
            status=data["status"]
        )

        db.session.add(shipment)
        db.session.commit()

        return shipment_schema.dump(shipment), 201


class ShipmentResource(Resource):
    def get(self, shipment_id):
        shipment = Shipment.query.get(shipment_id)

        if not shipment:
            return {"message": "Shipment not found."}, 404

        return shipment_schema.dump(shipment), 200

    def patch(self, shipment_id):
        shipment = Shipment.query.get(shipment_id)

        if not shipment:
            return {"message": "Shipment not found."}, 404

        data = request.get_json()

        for key, value in data.items():
            setattr(shipment, key, value)

        db.session.commit()

        return shipment_schema.dump(shipment), 200

    def delete(self, shipment_id):
        shipment = Shipment.query.get(shipment_id)

        if not shipment:
            return {"message": "Shipment not found."}, 404

        db.session.delete(shipment)
        db.session.commit()

        return {"message": "Shipment deleted successfully."}, 200