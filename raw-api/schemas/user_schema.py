from marshmallow import fields

from extensions import ma
from models.user import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_fk = True
        exclude = ("password_hash",)

    password = fields.String(
        load_only=True,
        required=True
    )


user_schema = UserSchema()
users_schema = UserSchema(many=True)