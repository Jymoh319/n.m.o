from extensions import ma
from models.site_record import SiteRecord
from schemas.user_schema import UserSchema
from schemas.mineral_schema import MineralSchema
from schemas.mining_site_schema import MiningSiteSchema


class SiteRecordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = SiteRecord
        load_instance = True
        include_fk = True

    record_id = ma.auto_field(dump_only=True)

    user_id = ma.auto_field(required=True)
    site_id = ma.auto_field(required=True)
    mineral_id = ma.auto_field(required=True)

    record_type = ma.auto_field(required=True)

    quantity = ma.auto_field()

    record_date = ma.auto_field(required=True)

    notes = ma.auto_field()

    created_at = ma.auto_field(dump_only=True)

    user = ma.Nested(UserSchema, dump_only=True)
    mineral = ma.Nested(MineralSchema, dump_only=True)
    mining_site = ma.Nested(MiningSiteSchema, dump_only=True)


site_record_schema = SiteRecordSchema()
site_records_schema = SiteRecordSchema(many=True)