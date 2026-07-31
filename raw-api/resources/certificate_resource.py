from flask import request
from flask_restful import Resource

from extensions import db
from models.certificate import Certificate
from schemas.certificate_schema import (
    certificate_schema,
    certificates_schema
)


class CertificateListResource(Resource):
    def get(self):
        certificates = Certificate.query.all()
        return certificates_schema.dump(certificates), 200

    def post(self):
        data = request.get_json()

        certificate = Certificate(
            site_id=data["site_id"],
            certificate_number=data["certificate_number"],
            certificate_name=data["certificate_name"],
            category=data["category"],
            issuer=data["issuer"],
            description=data.get("description"),
            issued_date=data["issued_date"],
            expiry_date=data["expiry_date"],
            status=data["status"]
        )

        db.session.add(certificate)
        db.session.commit()

        return certificate_schema.dump(certificate), 201


class CertificateResource(Resource):
    def get(self, certificate_id):
        certificate = Certificate.query.get(certificate_id)

        if not certificate:
            return {"message": "Certificate not found."}, 404

        return certificate_schema.dump(certificate), 200

    def patch(self, certificate_id):
        certificate = Certificate.query.get(certificate_id)

        if not certificate:
            return {"message": "Certificate not found."}, 404

        data = request.get_json()

        for key, value in data.items():
            setattr(certificate, key, value)

        db.session.commit()

        return certificate_schema.dump(certificate), 200

    def delete(self, certificate_id):
        certificate = Certificate.query.get(certificate_id)

        if not certificate:
            return {"message": "Certificate not found."}, 404

        db.session.delete(certificate)
        db.session.commit()

        return {"message": "Certificate deleted successfully."}, 200