from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from auth import current_user
from extensions import db
from models.settings import Settings


class SettingsResource(Resource):

    @jwt_required()
    def get(self):

        user = current_user()

        settings = Settings.query.filter_by(
            user_id=user.user_id
        ).first()

        if not settings:

            settings = Settings(
                user_id=user.user_id
            )

            db.session.add(settings)
            db.session.commit()

        return {
            "email_notifications":
                settings.email_notifications,
            "shipment_alerts":
                settings.shipment_alerts,
            "certification_renewals":
                settings.certification_renewals,
            "royalty_notifications":
                settings.royalty_notifications,
            "two_factor_auth":
                settings.two_factor_auth,
            "login_alerts":
                settings.login_alerts
        }, 200

    @jwt_required()
    def put(self):

        user = current_user()

        settings = Settings.query.filter_by(
            user_id=user.user_id
        ).first()

        if not settings:

            settings = Settings(
                user_id=user.user_id
            )

            db.session.add(settings)

        data = request.get_json()

        settings.email_notifications = data.get(
            "email_notifications",
            settings.email_notifications
        )

        settings.shipment_alerts = data.get(
            "shipment_alerts",
            settings.shipment_alerts
        )

        settings.certification_renewals = data.get(
            "certification_renewals",
            settings.certification_renewals
        )

        settings.royalty_notifications = data.get(
            "royalty_notifications",
            settings.royalty_notifications
        )

        settings.two_factor_auth = data.get(
            "two_factor_auth",
            settings.two_factor_auth
        )

        settings.login_alerts = data.get(
            "login_alerts",
            settings.login_alerts
        )

        db.session.commit()

        return {
            "success": True,
            "message": "Settings updated successfully."
        }, 200