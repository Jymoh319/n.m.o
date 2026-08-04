from datetime import datetime, timedelta, UTC
import secrets

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from auth import current_user, require_role
from extensions import db
from models.invitation import Invitation
from models.user import User
from services.email_service import send_email


class InvitationResource(Resource):

    @jwt_required()
    def post(self):

        admin = current_user()

        require_role(admin, "admin")

        data = request.get_json()

        email = data.get("email")
        role = data.get("role")

        if not email or not role:
            return {
                "success": False,
                "message": "Email and role are required."
            }, 400

        if role not in [
            "admin",
            "manager",
            "inspector",
            "worker"
        ]:
            return {
                "success": False,
                "message": "Invalid role."
            }, 400

        if User.query.filter_by(email=email).first():
            return {
                "success": False,
                "message": "User already exists."
            }, 409

        token = secrets.token_urlsafe(32)

        invitation = Invitation(
            email=email,
            role=role,
            token=token,
            invited_by=admin.user_id,
            expires_at=datetime.now(UTC) + timedelta(days=2)
        )

        db.session.add(invitation)
        db.session.commit()

        invite_link = (
            f"http://localhost:5173/invite/{token}"
        )

        body = f"""
Hello,

You have been invited to join Nairobi Mining Operations.

Assigned Role:
{role.title()}

Click the link below to accept your invitation.

{invite_link}

PS: This invitation expires in 48 hours.
"""

        send_email(
            recipient=email,
            subject="Nairobi Mining Operations" \
            "Invitation To Join Our Team!",
            body=body
        )

        return {
            "success": True,
            "message": "Invitation sent successfully."
        }, 201