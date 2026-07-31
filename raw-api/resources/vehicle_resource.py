from flask import request
from flask_restful import Resource

from extensions import db
from models.vehicle import Vehicle
from schemas.vehicle_schema import (
    vehicle_schema,
    vehicles_schema
)


class VehicleListResource(Resource):
    def get(self):
        vehicles = Vehicle.query.all()
        return vehicles_schema.dump(vehicles), 200

    def post(self):
        data = request.get_json()

        vehicle = Vehicle(
            site_id=data["site_id"],
            registration_number=data["registration_number"],
            vehicle_type=data["vehicle_type"],
            capacity=data["capacity"],
            status=data["status"]
        )

        db.session.add(vehicle)
        db.session.commit()

        return vehicle_schema.dump(vehicle), 201


class VehicleResource(Resource):
    def get(self, vehicle_id):
        vehicle = Vehicle.query.get(vehicle_id)

        if not vehicle:
            return {"message": "Vehicle not found."}, 404

        return vehicle_schema.dump(vehicle), 200

    def patch(self, vehicle_id):
        vehicle = Vehicle.query.get(vehicle_id)

        if not vehicle:
            return {"message": "Vehicle not found."}, 404

        data = request.get_json()

        for key, value in data.items():
            setattr(vehicle, key, value)

        db.session.commit()

        return vehicle_schema.dump(vehicle), 200

    def delete(self, vehicle_id):
        vehicle = Vehicle.query.get(vehicle_id)

        if not vehicle:
            return {"message": "Vehicle not found."}, 404

        db.session.delete(vehicle)
        db.session.commit()

        return {"message": "Vehicle deleted successfully."}, 200