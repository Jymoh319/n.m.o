from flask import request
from flask_restful import Resource

from extensions import db
from models.site_record import SiteRecord
from schemas.site_record_schema import (
    site_record_schema,
    site_records_schema
)


class SiteRecordListResource(Resource):
    def get(self):
        site_records = SiteRecord.query.all()
        return site_records_schema.dump(site_records), 200

    def post(self):
        data = request.get_json()

        site_record = SiteRecord(
            user_id=data["user_id"],
            site_id=data["site_id"],
            mineral_id=data["mineral_id"],
            record_type=data["record_type"],
            quantity=data.get("quantity"),
            record_date=data["record_date"],
            notes=data.get("notes")
        )

        db.session.add(site_record)
        db.session.commit()

        return site_record_schema.dump(site_record), 201


class SiteRecordResource(Resource):
    def get(self, record_id):
        site_record = SiteRecord.query.get(record_id)

        if not site_record:
            return {"message": "Site record not found."}, 404

        return site_record_schema.dump(site_record), 200

    def patch(self, record_id):
        site_record = SiteRecord.query.get(record_id)

        if not site_record:
            return {"message": "Site record not found."}, 404

        data = request.get_json()

        for key, value in data.items():
            setattr(site_record, key, value)

        db.session.commit()

        return site_record_schema.dump(site_record), 200

    def delete(self, record_id):
        site_record = SiteRecord.query.get(record_id)

        if not site_record:
            return {"message": "Site record not found."}, 404

        db.session.delete(site_record)
        db.session.commit()

        return {"message": "Site record deleted successfully."}, 200