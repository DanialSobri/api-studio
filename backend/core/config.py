import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DB_URL: str = os.getenv(
        "DB_URL",
        "mysql+mysqlconnector://api_user:example_password@localhost:3306/api_studio"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")

settings = Settings()