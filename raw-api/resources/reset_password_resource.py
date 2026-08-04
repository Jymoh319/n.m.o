from datetime import datetime, UTC

from flask import request
from flask_restful import Resource

from extensions import db
from models.user import User
from models.password_reset import PasswordReset


class ResetPasswordResource(Resource):

    def post(self):

        data = request.get_json()

        token = data.get("token")
        password = data.get("password")

        if not token or not password:
            return {
                "success": False,
                "message": "Token and password are required."
            }, 400

        reset = PasswordReset.query.filter_by(
            token=token
        ).first()

        if not reset:
            return {
                "success": False,
                "message": "Invalid reset token."
            }, 404

        if reset.used:
            return {
                "success": False,
                "message": "Reset link has already been used."
            }, 409

        if reset.expires_at < datetime.now(UTC):
            return {
                "success": False,
                "message": "Reset link has expired."
            }, 410

        user = User.query.get(reset.user_id)

        if not user:
            return {
                "success": False,
                "message": "User not found."
            }, 404

        user.password = password

        db.session.delete(reset)

        db.session.commit()

        return {
            "success": True,
            "message": "Password reset successful."
        }, 200
