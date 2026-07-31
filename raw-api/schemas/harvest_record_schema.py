from extensions import ma
from schemas.mineral_schema import MineralSchema
from schemas.mining_site_schema import MiningSiteSchema
from models.harvest_record import HarvestRecord


class HarvestRecordSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = HarvestRecord
        load_instance = True
        include_fk = True

    harvest_id = ma.auto_field(dump_only=True)

    site_id = ma.auto_field(required=True)
    mineral_id = ma.auto_field(required=True)

    batch_code = ma.auto_field(required=True)
    quantity = ma.auto_field(required=True)
    grade = ma.auto_field(required=True)

    method = ma.auto_field(required=True)
    status = ma.auto_field(required=True)

    harvest_date = ma.auto_field(required=True)

    created_at = ma.auto_field(dump_only=True)

    mineral = ma.Nested(MineralSchema, dump_only=True)
    mining_site = ma.Nested(MiningSiteSchema, dump_only=True)


harvest_record_schema = HarvestRecordSchema()
harvest_records_schema = HarvestRecordSchema(many=True)