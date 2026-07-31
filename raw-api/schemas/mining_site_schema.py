from marshmallow import fields

from extensions import ma
from models.mining_site import MiningSite


class MiningSiteSchema(ma.SQLAlchemyAutoSchema):
    latitude = fields.Float()
    longitude = fields.Float()

    class Meta:
        model = MiningSite
        load_instance = True
        include_fk = True


mining_site_schema = MiningSiteSchema()
mining_sites_schema = MiningSiteSchema(many=True)