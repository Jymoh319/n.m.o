from extensions import ma
from models.certificate import Certificate


class CertificateSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Certificate
        load_instance = True
        include_fk = True

    certificate_id = ma.auto_field(dump_only=True)

    certificate_number = ma.auto_field(required=True)
    certificate_name = ma.auto_field(required=True)

    category = ma.auto_field(required=True)
    issuer = ma.auto_field(required=True)

    description = ma.auto_field()

    issued_date = ma.auto_field(required=True)
    expiry_date = ma.auto_field(required=True)

    status = ma.auto_field(required=True)

    created_at = ma.auto_field(dump_only=True)


certificate_schema = CertificateSchema()
certificates_schema = CertificateSchema(many=True)