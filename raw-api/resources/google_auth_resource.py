import secrets

from flask import url_for
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from extensions import oauth, db
from models.user import User


class GoogleLoginResource(Resource):

    def get(self):

        google = oauth.create_client("google")

        redirect_uri = url_for(
            "googlecallbackresource",
            _external=True
        )

        return google.authorize_redirect(
            redirect_uri
        )


class GoogleCallbackResource(Resource):

    def get(self):

        google = oauth.create_client("google")

        token = google.authorize_access_token()

        user_info = token["userinfo"]

        email = user_info["email"]

        username = user_info.get(
            "name",
            email.split("@")[0]
        )

        user = User.query.filter_by(
            email=email
        ).first()

        if not user:

            user = User(
                username=username,
                email=email,
                role="worker"
            )

            user.password = secrets.token_urlsafe(32)

            db.session.add(user)
            db.session.commit()

        access_token = create_access_token(
            identity=str(user.user_id),
            additional_claims={
                "username": user.username,
                "role": user.role
            }
        )

        return {
            "success": True,
            "message": "Google login successful.",
            "access_token": access_token,
            "user": user.to_dict()
        }, 200

        # Later, when React is ready, replace the JSON above with:
        #
        # return redirect(
        #     f"http://localhost:5173/google-success?token={access_token}"
        # )