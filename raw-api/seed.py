from datetime import date

from app import create_app
from extensions import db

from models.user import User
from models.mining_site import MiningSite
from models.mineral import Mineral
from models.vehicle import Vehicle
from models.certificate import Certificate
from models.harvest_record import HarvestRecord
from models.shipment import Shipment
from models.site_record import SiteRecord

app = create_app()

with app.app_context():

    db.drop_all()
    db.create_all()

    # ---------------- USERS ----------------

    admin = User(
        username="admin",
        email="admin@nmo.co.ke",
        role="admin"
    )
    admin.password = "Admin123!"

    manager = User(
        username="manager",
        email="manager@nmo.co.ke",
        role="manager"
    )
    manager.password = "Manager123!"

    inspector = User(
        username="inspector",
        email="inspector@nmo.co.ke",
        role="inspector"
    )
    inspector.password = "Inspector123!"

    db.session.add_all([
        admin,
        manager,
        inspector
    ])

    db.session.commit()

    # ---------------- MINERALS ----------------

    titanium = Mineral(
        mineral_name="Titanium",
        category="Metal",
        unit="Tonnes",
        description="High-grade titanium ore."
    )

    zircon = Mineral(
        mineral_name="Zircon",
        category="Industrial Mineral",
        unit="Tonnes",
        description="Premium zircon concentrate."
    )

    rutile = Mineral(
        mineral_name="Rutile",
        category="Titanium Mineral",
        unit="Tonnes",
        description="Natural rutile deposits."
    )

    ilmenite = Mineral(
        mineral_name="Ilmenite",
        category="Titanium Ore",
        unit="Tonnes",
        description="Primary titanium-bearing mineral."
    )

    monazite = Mineral(
        mineral_name="Monazite",
        category="Rare Earth Mineral",
        unit="Tonnes",
        description="Rare earth phosphate mineral."
    )

    db.session.add_all([
        titanium,
        zircon,
        rutile,
        ilmenite,
        monazite
    ])

    db.session.commit()

        # ---------------- MINING SITES ----------------

    mrima_hills = MiningSite(
        site_name="Mrima Hills",
        county="Kwale",
        latitude=-4.484722,
        longitude=39.242500,
        depth="120 m",
        area="12.5 km²",
        yield_estimate="45,000 tonnes/year",
        water_table="18 m",
        status="Active"
    )

    sector_3a = MiningSite(
        site_name="Sector 3A",
        county="Kwale",
        latitude=-4.486210,
        longitude=39.244380,
        depth="95 m",
        area="7.2 km²",
        yield_estimate="22,000 tonnes/year",
        water_table="16 m",
        status="Active"
    )

    sector_5c = MiningSite(
        site_name="Sector 5C",
        county="Kwale",
        latitude=-4.489910,
        longitude=39.246020,
        depth="140 m",
        area="9.8 km²",
        yield_estimate="38,000 tonnes/year",
        water_table="20 m",
        status="Maintenance"
    )

    sector_7b = MiningSite(
        site_name="Sector 7B",
        county="Kwale",
        latitude=-4.492880,
        longitude=39.249100,
        depth="110 m",
        area="8.4 km²",
        yield_estimate="30,000 tonnes/year",
        water_table="17 m",
        status="Active"
    )

    sector_9d = MiningSite(
        site_name="Sector 9D",
        county="Kwale",
        latitude=-4.496540,
        longitude=39.252730,
        depth="150 m",
        area="10.1 km²",
        yield_estimate="41,000 tonnes/year",
        water_table="23 m",
        status="Exploration"
    )

    db.session.add_all([
        mrima_hills,
        sector_3a,
        sector_5c,
        sector_7b,
        sector_9d
    ])

    db.session.commit()

    # ---------------- VEHICLES ----------------

    vehicles = [

    Vehicle(
        site_id=mrima_hills.site_id,
        registration_number="KDM201A",
        vehicle_type="Dump Truck",
        capacity=35,
        status="Available"
    ),

    Vehicle(
        site_id=sector_3a.site_id,
        registration_number="KDN118B",
        vehicle_type="Excavator",
        capacity=22,
        status="Operating"
    ),

    Vehicle(
        site_id=sector_5c.site_id,
        registration_number="KDP442X",
        vehicle_type="Wheel Loader",
        capacity=18,
        status="Maintenance"
    ),

    Vehicle(
        site_id=sector_7b.site_id,
        registration_number="KDT903L",
        vehicle_type="Tipper Truck",
        capacity=30,
        status="Available"
    ),

    Vehicle(
        site_id=sector_9d.site_id,
        registration_number="KDX741M",
        vehicle_type="Bulldozer",
        capacity=40,
        status="Operating"
    )

]

    db.session.add_all(vehicles)
    db.session.commit()

# ---------------- CERTIFICATES ----------------

    certificates = [

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-001",
        certificate_name="ISO 14001",
        category="Environmental",
        issuer="SGS Kenya",
        description="Environmental management certification.",
        issued_date=date(2023,3,15),
        expiry_date=date(2026,3,15),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-002",
        certificate_name="ISO 9001",
        category="Quality",
        issuer="Bureau Veritas",
        description="Quality management certification.",
        issued_date=date(2023,1,10),
        expiry_date=date(2026,1,10),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-003",
        certificate_name="OHSAS 18001",
        category="Safety",
        issuer="TUV Rheinland",
        description="Occupational safety certification.",
        issued_date=date(2023,6,20),
        expiry_date=date(2026,6,20),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-004",
        certificate_name="Fairmined",
        category="Ethical",
        issuer="Alliance for Responsible Mining",
        description="Responsible mining certification.",
        issued_date=date(2022,8,1),
        expiry_date=date(2024,8,1),
        status="Renewal"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-005",
        certificate_name="Conflict-Free",
        category="Supply Chain",
        issuer="RMI",
        description="Conflict-free minerals certification.",
        issued_date=date(2024,1,5),
        expiry_date=date(2025,1,5),
        status="Active"
    ),

    Certificate(
        site_id=mrima_hills.site_id,
        certificate_number="CERT-006",
        certificate_name="Carbon Neutral",
        category="Sustainability",
        issuer="South Pole",
        description="Carbon neutrality certification.",
        issued_date=date(2024,2,15),
        expiry_date=date(2025,2,15),
        status="Pending"
    )

]

    db.session.add_all(certificates)
    db.session.commit()

        # ---------------- HARVEST RECORDS ----------------

    harvest_records = [

        HarvestRecord(
            site_id=sector_7b.site_id,
            mineral_id=titanium.mineral_id,
            batch_code="HB-2024-089",
            quantity=850,
            grade="92%",
            method="Open Pit",
            status="Processed",
            harvest_date=date(2024, 6, 20)
        ),

        HarvestRecord(
            site_id=sector_9d.site_id,
            mineral_id=zircon.mineral_id,
            batch_code="HB-2024-088",
            quantity=420,
            grade="88%",
            method="Dredging",
            status="Processed",
            harvest_date=date(2024, 6, 18)
        ),

        HarvestRecord(
            site_id=sector_7b.site_id,
            mineral_id=rutile.mineral_id,
            batch_code="HB-2024-087",
            quantity=310,
            grade="95%",
            method="Open Pit",
            status="Processed",
            harvest_date=date(2024, 6, 15)
        ),

        HarvestRecord(
            site_id=sector_3a.site_id,
            mineral_id=ilmenite.mineral_id,
            batch_code="HB-2024-086",
            quantity=680,
            grade="85%",
            method="Dredging",
            status="Processed",
            harvest_date=date(2024, 6, 12)
        ),

        HarvestRecord(
            site_id=sector_3a.site_id,
            mineral_id=monazite.mineral_id,
            batch_code="HB-2024-085",
            quantity=150,
            grade="78%",
            method="Open Pit",
            status="Processing",
            harvest_date=date(2024, 6, 10)
        ),

        HarvestRecord(
            site_id=sector_7b.site_id,
            mineral_id=titanium.mineral_id,
            batch_code="HB-2024-084",
            quantity=920,
            grade="93%",
            method="Open Pit",
            status="Processed",
            harvest_date=date(2024, 6, 8)
        )

    ]

    db.session.add_all(harvest_records)
    db.session.commit()

    # ---------------- SHIPMENTS ----------------

    shipments = [

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[0].vehicle_id,
            shipment_code="SHP-2024-001",
            origin="Mrima Hills",
            destination="Mombasa Port",
            cargo="Ilmenite Concentrate",
            quantity=2500,
            vessel="MV African Star",
            shipment_date=date(2024, 6, 15),
            estimated_arrival=date(2024, 6, 18),
            status="In Transit"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[1].vehicle_id,
            shipment_code="SHP-2024-002",
            origin="Mrima Hills",
            destination="Dar es Salaam",
            cargo="Rutile Sand",
            quantity=1200,
            vessel="MV Indian Ocean",
            shipment_date=date(2024, 6, 10),
            estimated_arrival=date(2024, 6, 13),
            status="Delivered"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[2].vehicle_id,
            shipment_code="SHP-2024-003",
            origin="Mrima Hills",
            destination="Durban",
            cargo="Zircon Sand",
            quantity=800,
            vessel="MV Cape Hope",
            shipment_date=date(2024, 6, 25),
            estimated_arrival=date(2024, 7, 2),
            status="Pending"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[3].vehicle_id,
            shipment_code="SHP-2024-004",
            origin="Mrima Hills",
            destination="Mombasa Port",
            cargo="Titanium Slag",
            quantity=3100,
            vessel="MV Kenya Pride",
            shipment_date=date(2024, 6, 18),
            estimated_arrival=date(2024, 6, 21),
            status="In Transit"
        ),

        Shipment(
            site_id=mrima_hills.site_id,
            vehicle_id=vehicles[4].vehicle_id,
            shipment_code="SHP-2024-005",
            origin="Mrima Hills",
            destination="Lagos",
            cargo="Monazite Concentrate",
            quantity=450,
            vessel="MV West Africa",
            shipment_date=date(2024, 6, 5),
            estimated_arrival=date(2024, 6, 12),
            status="Delivered"
        )

    ]

    db.session.add_all(shipments)
    db.session.commit()

    # ---------------- SITE RECORDS ----------------

    site_records = [

        SiteRecord(
            user_id=admin.user_id,
            site_id=sector_7b.site_id,
            mineral_id=titanium.mineral_id,
            record_type="Harvest",
            quantity=850,
            record_date=date(2024, 6, 20),
            notes="High-grade titanium successfully harvested."
        ),

        SiteRecord(
            user_id=manager.user_id,
            site_id=sector_9d.site_id,
            mineral_id=zircon.mineral_id,
            record_type="Inspection",
            quantity=None,
            record_date=date(2024, 6, 18),
            notes="Routine inspection completed."
        ),

        SiteRecord(
            user_id=inspector.user_id,
            site_id=sector_5c.site_id,
            mineral_id=ilmenite.mineral_id,
            record_type="Maintenance",
            quantity=None,
            record_date=date(2024, 6, 16),
            notes="Loader maintenance performed."
        ),

        SiteRecord(
            user_id=manager.user_id,
            site_id=sector_3a.site_id,
            mineral_id=monazite.mineral_id,
            record_type="Harvest",
            quantity=150,
            record_date=date(2024, 6, 10),
            notes="Monazite batch recorded."
        ),

        SiteRecord(
            user_id=admin.user_id,
            site_id=mrima_hills.site_id,
            mineral_id=titanium.mineral_id,
            record_type="Shipment",
            quantity=2500,
            record_date=date(2024, 6, 15),
            notes="Shipment dispatched to Mombasa Port."
        )

    ]

    db.session.add_all(site_records)
    db.session.commit()

    print("Database seeded successfully!")