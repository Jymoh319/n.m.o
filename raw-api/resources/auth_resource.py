from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from auth import (
    authenticate_user,
    current_user,
    register_user
)
from extensions import db
from schemas.user_schema import user_schema


class RegisterResource(Resource):

    def post(self):
        data = request.get_json()

        user = register_user(data)

        db.session.add(user)
        db.session.commit()

        return {
            "success": True,
            "message": "User registered successfully.",
            "user": user.to_dict()
        }, 201


class LoginResource(Resource):

    def post(self):
        data = request.get_json()

        token, user = authenticate_user(data)

        return {
            "success": True,
            "message": "Login successful.",
            "access_token": token,
            "user": user.to_dict()
        }, 200


class CurrentUserResource(Resource):

    @jwt_required()
    def get(self):
        user = current_user()

        return {
            "success": True,
            "user": user.to_dict()
        }, 200


class LogoutResource(Resource):

    @jwt_required()
    def post(self):
        return {
            "success": True,
            "message": "Logout successful."
        }, 200
