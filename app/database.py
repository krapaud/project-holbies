from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# RÈGLE: PostgreSQL OBLIGATOIRE - SQLite INTERDIT
# Configuration PostgreSQL par défaut, peut être overridée par .env
DEFAULT_DB = (
    "postgresql+psycopg://holbies_user:holbies_password@"
    "localhost:5432/holbies_db"
)
DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DB)

# Validation: Vérifier que l'URL est bien PostgreSQL
postgres_prefixes = ("postgresql://", "postgresql+psycopg://")
if not DATABASE_URL.startswith(postgres_prefixes):
    raise ValueError(
        "❌ ERREUR: Seul PostgreSQL est autorisé. "
        "SQLite est interdit dans ce projet."
    )

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
