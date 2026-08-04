from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from config import Config
from extensions import db, ma, bcrypt, jwt, migrate, oauth, mail
from services.email_service import send_email

from resources.auth_resource import (
    RegisterResource,
    LoginResource,
    CurrentUserResource,
    LogoutResource
)

from resources.user_resource import UserListResource, UserResource
from resources.mining_site_resource import MiningSiteListResource, MiningSiteResource
from resources.mineral_resource import MineralListResource, MineralResource
from resources.harvest_record_resource import HarvestRecordListResource, HarvestRecordResource
from resources.certificate_resource import CertificateListResource, CertificateResource
from resources.vehicle_resource import VehicleListResource, VehicleResource
from resources.shipment_resource import ShipmentListResource, ShipmentResource
from resources.site_record_resource import SiteRecordListResource, SiteRecordResource
from resources.google_auth_resource import GoogleLoginResource, GoogleCallbackResource
from resources.invitation_resource import InvitationResource


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    oauth.init_app(app)
    mail.init_app(app)

    google = oauth.register(
        name="google",
        client_id=app.config["GOOGLE_CLIENT_ID"],
        client_secret=app.config["GOOGLE_CLIENT_SECRET"],
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={
            "scope": "openid email profile"
        }
    )

    api = Api(app)

    @app.get("/")
    def home():
        return {
            "status": "Healthy",
            "message": "Mining Management API is running!"
        }, 200

    # ---------- Authentication ----------

    api.add_resource(RegisterResource, "/register")
    api.add_resource(LoginResource, "/login")
    api.add_resource(CurrentUserResource, "/me")
    api.add_resource(LogoutResource, "/logout")

    # ---------- Users ----------

    api.add_resource(UserListResource, "/api/users")
    api.add_resource(UserResource, "/api/users/<int:user_id>")

    # ---------- Mining Sites ----------

    api.add_resource(MiningSiteListResource, "/api/mining-sites")
    api.add_resource(MiningSiteResource, "/api/mining-sites/<int:site_id>")

    # ---------- Minerals ----------

    api.add_resource(MineralListResource, "/api/minerals")
    api.add_resource(MineralResource, "/api/minerals/<int:mineral_id>")

    # ---------- Harvest Records ----------

    api.add_resource(HarvestRecordListResource, "/api/harvest-records")
    api.add_resource(HarvestRecordResource, "/api/harvest-records/<int:harvest_id>")

    # ---------- Certificates ----------

    api.add_resource(CertificateListResource, "/api/certificates")
    api.add_resource(CertificateResource, "/api/certificates/<int:certificate_id>")

    # ---------- Vehicles ----------

    api.add_resource(VehicleListResource, "/api/vehicles")
    api.add_resource(VehicleResource, "/api/vehicles/<int:vehicle_id>")

    # ---------- Shipments ----------

    api.add_resource(ShipmentListResource, "/api/shipments")
    api.add_resource(ShipmentResource, "/api/shipments/<int:shipment_id>")

    # ---------- Site Records ----------

    api.add_resource(SiteRecordListResource, "/api/site-records")
    api.add_resource(SiteRecordResource, "/api/site-records/<int:record_id>")

    # ---------- Google Callbacks ----------

    api.add_resource(GoogleLoginResource, "/api/auth/google")
    api.add_resource(GoogleCallbackResource, "/api/auth/google/callback")

    # ---------- Invitations ----------

    api.add_resource(InvitationResource, "/api/invitations")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)