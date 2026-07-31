from flask import request
from flask_restful import Resource

from extensions import db
from models.mining_site import MiningSite
from schemas.mining_site_schema import (
    mining_site_schema,
    mining_sites_schema
)


class MiningSiteListResource(Resource):
    def get(self):
        mining_sites = MiningSite.query.all()
        return mining_sites_schema.dump(mining_sites), 200

    def post(self):
        data = request.get_json()

        mining_site = MiningSite(
            site_name=data["site_name"],
            county=data["county"],
            latitude=data["latitude"],
            longitude=data["longitude"],
            status=data["status"]
        )

        db.session.add(mining_site)
        db.session.commit()

        return mining_site_schema.dump(mining_site), 201


class MiningSiteResource(Resource):
    def get(self, site_id):
        mining_site = MiningSite.query.get(site_id)

        if not mining_site:
            return {"message": "Mining site not found."}, 404

        return mining_site_schema.dump(mining_site), 200

    def patch(self, site_id):
        mining_site = MiningSite.query.get(site_id)

        if not mining_site:
            return {"message": "Mining site not found."}, 404

        data = request.get_json()

        if "site_name" in data:
            mining_site.site_name = data["site_name"]

        if "county" in data:
            mining_site.county = data["county"]

        if "latitude" in data:
            mining_site.latitude = data["latitude"]

        if "longitude" in data:
            mining_site.longitude = data["longitude"]

        if "status" in data:
            mining_site.status = data["status"]

        db.session.commit()

        return mining_site_schema.dump(mining_site), 200

    def delete(self, site_id):
        mining_site = MiningSite.query.get(site_id)

        if not mining_site:
            return {"message": "Mining site not found."}, 404

        db.session.delete(mining_site)
        db.session.commit()

        return {"message": "Mining site deleted successfully."}, 200