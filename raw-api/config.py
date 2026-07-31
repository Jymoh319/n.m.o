import os

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///demo.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "playlist-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwt-secret-key")
# Deployable in Render