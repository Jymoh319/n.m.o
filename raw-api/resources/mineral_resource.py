from flask import request
from flask_restful import Resource

from extensions import db
from models.mineral import Mineral
from schemas.mineral_schema import (
    mineral_schema,
    minerals_schema
)


class MineralListResource(Resource):
    def get(self):
        minerals = Mineral.query.all()
        return minerals_schema.dump(minerals), 200

    def post(self):
        data = request.get_json()

        mineral = Mineral(
            mineral_name=data["mineral_name"],
            category=data["category"],
            unit=data["unit"],
            description=data["description"]
        )

        db.session.add(mineral)
        db.session.commit()

        return mineral_schema.dump(mineral), 201


class MineralResource(Resource):
    def get(self, mineral_id):
        mineral = Mineral.query.get(mineral_id)

        if not mineral:
            return {"message": "Mineral not found."}, 404

        return mineral_schema.dump(mineral), 200

    def patch(self, mineral_id):
        mineral = Mineral.query.get(mineral_id)

        if not mineral:
            return {"message": "Mineral not found."}, 404

        data = request.get_json()

        if "mineral_name" in data:
            mineral.mineral_name = data["mineral_name"]

        if "category" in data:
            mineral.category = data["category"]

        if "unit" in data:
            mineral.unit = data["unit"]

        if "description" in data:
            mineral.description = data["description"]

        db.session.commit()

        return mineral_schema.dump(mineral), 200

    def delete(self, mineral_id):
        mineral = Mineral.query.get(mineral_id)

        if not mineral:
            return {"message": "Mineral not found."}, 404

        db.session.delete(mineral)
        db.session.commit()

        return {"message": "Mineral deleted successfully."}, 200