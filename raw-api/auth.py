from flask import abort
from flask_jwt_extended import create_access_token, get_jwt_identity

from models.user import User


def register_user(data):
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "worker")

    if not username or not email or not password:
        abort(
            400,
            description="Username, email and password are required."
        )

    if User.query.filter_by(username=username).first():
        abort(
            409,
            description="Username already exists."
        )

    if User.query.filter_by(email=email).first():
        abort(
            409,
            description="Email already exists."
        )

    user = User(
        username=username,
        email=email,
        role=role
    )

    user.password = password

    return user


def authenticate_user(data):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        abort(
            400,
            description="Email and password are required."
        )

    user = User.query.filter_by(email=email).first()

    if not user:
        abort(
            401,
            description="Invalid email or password."
        )

    if not user.verify_password(password):
        abort(
            401,
            description="Invalid email or password."
        )

    token = create_access_token(
        identity=user.user_id,
        additional_claims={
            "username": user.username,
            "role": user.role
        }
    )

    return token, user


def current_user():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if user is None:
        abort(
            404,
            description="User not found."
        )

    return user


def require_role(user, *roles):
    if user.role not in roles:
        abort(
            403,
            description="You are not authorized to perform this action."
        )
