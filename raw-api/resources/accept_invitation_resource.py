from datetime import datetime, UTC

from flask import request
from flask_restful import Resource

from extensions import db
from models.invitation import Invitation
from models.user import User


class AcceptInvitationResource(Resource):

    def post(self):

        data = request.get_json()

        token = data.get("token")
        username = data.get("username")
        password = data.get("password")

        if not token or not username or not password:
            return {
                "success": False,
                "message": "Token, username and password are required."
            }, 400

        invitation = Invitation.query.filter_by(
            token=token
        ).first()

        if not invitation:
            return {
                "success": False,
                "message": "Invalid invitation."
            }, 404

        if invitation.accepted:
            return {
                "success": False,
                "message": "Invitation has already been used."
            }, 409

        if invitation.expires_at < datetime.now(UTC):
            return {
                "success": False,
                "message": "Invitation has expired."
            }, 410

        if User.query.filter_by(username=username).first():
            return {
                "success": False,
                "message": "Username already exists."
            }, 409

        user = User(
            username=username,
            email=invitation.email,
            role=invitation.role
        )

        user.password = password

        db.session.add(user)
        db.session.delete(invitation)
        db.session.commit()

        return {
            "success": True,
            "message": "Account created successfully.",
            "user": user.to_dict()
        }, 201