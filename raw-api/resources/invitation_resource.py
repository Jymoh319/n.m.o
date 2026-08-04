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
<div style="max-width:650px;margin:auto;padding:30px;
font-family:Arial,sans-serif;
background:#ffffff;
border-radius:18px;
border:1px solid #dddddd;">

    <div style="text-align:center;">

        <img
            src="https://n-m-o.vercel.app/nmo-intro.png"
            width="230"
            style="border-radius:20px;"
        >

        <h2 style="color:#0f4c81;">
            Nairobi Mining Operations
        </h2>

    </div>

    <p>Hello,</p>

    <p>
        You have been invited to join
        <strong>Nairobi Mining Operations</strong>.
    </p>

    <p>
        <strong>Assigned Role:</strong>
        {role.title()}
    </p>

    <p>
        Click the button below to accept your invitation.
    </p>

    <div style="text-align:center;margin:40px 0;">

        <a
            href="{invite_link}"
            style="
                background:#0f4c81;
                color:white;
                padding:15px 30px;
                text-decoration:none;
                border-radius:12px;
                font-weight:bold;
            "
        >
            Accept Invitation
        </a>

    </div>

    <p>
        This invitation expires in
        <strong>48 hours</strong>.
    </p>

    <hr>

    <small style="color:#777;">
        Nairobi Mining Operations © 2026
    </small>

</div>
"""

        send_email(
            recipient=email,
            subject="Nairobi Mining Operations - Invitation To Join Our Team!",
            html=body
        )

        return {
            "success": True,
            "message": "Invitation sent successfully."
        }, 201