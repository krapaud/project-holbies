#!/usr/bin/env python3
"""
Script de validation - Vérification PostgreSQL
Vérifie que le projet utilise bien PostgreSQL et non SQLite
"""

import os
import sys
from pathlib import Path

def check_database_config():
    """Vérifie la configuration de base de données"""
    print("🔍 Vérification de la configuration PostgreSQL...")
    
    errors = []
    
    # Vérifier .env.example
    env_example = Path(".env.example")
    if env_example.exists():
        content = env_example.read_text()
        if "sqlite" in content.lower() and not content.count("# ") > content.count("sqlite"):
            errors.append("❌ .env.example contient des références SQLite non commentées")
        if "postgresql://" not in content:
            errors.append("❌ .env.example ne contient pas de configuration PostgreSQL")
    
    # Vérifier app/database.py
    database_py = Path("app/database.py")
    if database_py.exists():
        content = database_py.read_text()
        if "sqlite" in content.lower() and "postgresql" not in content.lower():
            errors.append("❌ app/database.py utilise SQLite au lieu de PostgreSQL")
    
    # Vérifier alembic.ini
    alembic_ini = Path("config/alembic.ini")
    if alembic_ini.exists():
        content = alembic_ini.read_text()
        if "sqlite" in content.lower() and not "postgresql" in content.lower():
            errors.append("❌ config/alembic.ini utilise SQLite au lieu de PostgreSQL")
    
    # Vérifier la présence de fichiers SQLite
    project_root = Path(".")
    sqlite_files = list(project_root.glob("*.db")) + list(project_root.glob("*.sqlite*"))
    if sqlite_files:
        errors.append(f"❌ Fichiers SQLite détectés: {[f.name for f in sqlite_files]}")
    
    return errors

def check_postgresql_dependencies():
    """Vérifie les dépendances PostgreSQL"""
    print("🔍 Vérification des dépendances PostgreSQL...")
    
    requirements = Path("requirements.txt")
    if not requirements.exists():
        return ["❌ requirements.txt introuvable"]
    
    content = requirements.read_text()
    errors = []
    
    if "psycopg2" not in content:
        errors.append("❌ psycopg2 manquant dans requirements.txt")
    
    return errors

def main():
    """Fonction principale de validation"""
    print("🚀 Validation de la configuration PostgreSQL - Holbies Learning Hub")
    print("=" * 60)
    
    all_errors = []
    
    # Vérifications
    all_errors.extend(check_database_config())
    all_errors.extend(check_postgresql_dependencies())
    
    # Résultats
    print("\n📊 RÉSULTATS:")
    print("-" * 30)
    
    if not all_errors:
        print("✅ SUCCÈS: Configuration PostgreSQL valide!")
        print("✅ Aucune trace de SQLite détectée")
        print("✅ Toutes les dépendances PostgreSQL sont présentes")
        return 0
    else:
        print("❌ ERREURS DÉTECTÉES:")
        for error in all_errors:
            print(f"   {error}")
        print(f"\n💡 {len(all_errors)} erreur(s) à corriger")
        return 1

if __name__ == "__main__":
    sys.exit(main())
