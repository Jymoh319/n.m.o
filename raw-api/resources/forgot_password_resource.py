from datetime import datetime, timedelta, UTC
import secrets

from flask import request
from flask_restful import Resource

from extensions import db
from models.user import User
from models.password_reset import PasswordReset
from services.email_service import send_email


class ForgotPasswordResource(Resource):

    def post(self):

        data = request.get_json()

        email = data.get("email")

        if not email:
            return {
                "success": False,
                "message": "Email is required."
            }, 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return {
                "success": True,
                "message": "If an account exists, a reset link has been sent."
            }, 200

        token = secrets.token_urlsafe(32)

        reset = PasswordReset(
            user_id=user.user_id,
            token=token,
            expires_at=datetime.now(UTC) + timedelta(minutes=30)
        )

        db.session.add(reset)
        db.session.commit()

        reset_link = f"http://localhost:5173/reset-password/{token}"

        html = f"""
        <h2>Password Reset Request</h2>

        <p>Hello {user.username},</p>

        <p>
            We received a request to reset your password.
        </p>

        <p>
            Click the link below:
        </p>

        <p>
            <a href="{reset_link}">
                Reset Password
            </a>
        </p>

        <p>
            This link expires in 30 minutes.
        </p>

        <p>
            If you didn't request this, ignore this email.
        </p>
        """

        send_email(
            recipient=user.email,
            subject="Reset Your Password",
            html=html
        )

        return {
            "success": True,
            "message": "Password reset email sent."
        }, 200
