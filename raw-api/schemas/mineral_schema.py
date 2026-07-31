from extensions import ma
from models.mineral import Mineral


class MineralSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Mineral
        load_instance = True
        include_fk = True


mineral_schema = MineralSchema()
minerals_schema = MineralSchema(many=True)