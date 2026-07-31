from flask import request
from flask_restful import Resource

from extensions import db
from models.user import User
from schemas.user_schema import user_schema, users_schema


class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200

    def post(self):
        data = request.get_json()

        new_user = User(
            username=data["username"],
            email=data["email"],
            password_hash=data["password_hash"],
            role=data["role"]
        )

        db.session.add(new_user)
        db.session.commit()

        return user_schema.dump(new_user), 201


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)

        if not user:
            return {"message": "User not found."}, 404

        return user_schema.dump(user), 200

    def patch(self, user_id):
        user = User.query.get(user_id)

        if not user:
            return {"message": "User not found."}, 404

        data = request.get_json()

        if "username" in data:
            user.username = data["username"]

        if "email" in data:
            user.email = data["email"]

        if "password_hash" in data:
            user.password_hash = data["password_hash"]

        if "role" in data:
            user.role = data["role"]

        db.session.commit()

        return user_schema.dump(user), 200

    def delete(self, user_id):
        user = User.query.get(user_id)

        if not user:
            return {"message": "User not found."}, 404

        db.session.delete(user)
        db.session.commit()

        return {"message": "User deleted successfully."}, 200