from flask import request
from flask_restful import Resource

from extensions import db
from models.harvest_record import HarvestRecord
from schemas.harvest_record_schema import (
    harvest_record_schema,
    harvest_records_schema
)


class HarvestRecordListResource(Resource):
    def get(self):
        harvest_records = HarvestRecord.query.all()
        return harvest_records_schema.dump(harvest_records), 200

    def post(self):
        data = request.get_json()

        harvest_record = HarvestRecord(
            site_id=data["site_id"],
            mineral_id=data["mineral_id"],
            batch_code=data["batch_code"],
            quantity=data["quantity"],
            grade=data["grade"],
            method=data["method"],
            status=data["status"],
            harvest_date=data["harvest_date"]
        )

        db.session.add(harvest_record)
        db.session.commit()

        return harvest_record_schema.dump(harvest_record), 201


class HarvestRecordResource(Resource):
    def get(self, harvest_id):
        harvest_record = HarvestRecord.query.get(harvest_id)

        if not harvest_record:
            return {"message": "Harvest record not found."}, 404

        return harvest_record_schema.dump(harvest_record), 200

    def patch(self, harvest_id):
        harvest_record = HarvestRecord.query.get(harvest_id)

        if not harvest_record:
            return {"message": "Harvest record not found."}, 404

        data = request.get_json()

        for key, value in data.items():
            setattr(harvest_record, key, value)

        db.session.commit()

        return harvest_record_schema.dump(harvest_record), 200

    def delete(self, harvest_id):
        harvest_record = HarvestRecord.query.get(harvest_id)

        if not harvest_record:
            return {"message": "Harvest record not found."}, 404

        db.session.delete(harvest_record)
        db.session.commit()

        return {"message": "Harvest record deleted successfully."}, 200