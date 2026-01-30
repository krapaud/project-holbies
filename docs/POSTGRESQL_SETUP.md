# 🐘 Configuration PostgreSQL - Holbies Learning Hub

## 🚨 RÈGLE IMPORTANTE

**PostgreSQL OBLIGATOIRE** - SQLite est **INTERDIT** dans ce projet.

## 📋 Prérequis

### Installation PostgreSQL

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### CentOS/RHEL
```bash
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### macOS
```bash
brew install postgresql
brew services start postgresql
```

#### Windows
Télécharger depuis : https://www.postgresql.org/download/windows/

## ⚙️ Configuration de la base de données

### 1. Créer l'utilisateur et la base

```bash
# Se connecter en tant que postgres
sudo -u postgres psql

# Dans psql
CREATE USER holbies_user WITH PASSWORD 'holbies_password';
CREATE DATABASE holbies_db OWNER holbies_user;
GRANT ALL PRIVILEGES ON DATABASE holbies_db TO holbies_user;
\q
```

### 2. Configurer les variables d'environnement

Copier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

Modifier `.env` :
```bash
# Variables de base de données - POSTGRESQL OBLIGATOIRE
DATABASE_URL=postgresql://holbies_user:holbies_password@localhost:5432/holbies_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=holbies_db
DB_USER=holbies_user
DB_PASSWORD=holbies_password
```

## 🐳 Docker (Recommandé)

### Démarrage avec Docker Compose
```bash
# Depuis la racine du projet
docker-compose -f config/docker-compose.yml up -d

# Vérifier que PostgreSQL fonctionne
docker-compose -f config/docker-compose.yml ps
```

### Variables d'environnement Docker
```bash
DATABASE_URL=postgresql://holbies_user:holbies_password@db:5432/holbies_db
```

## 🔄 Migrations avec Alembic

### Première initialisation
```bash
# Générer la première migration
alembic -c config/alembic.ini revision --autogenerate -m "Initial migration"

# Appliquer les migrations
alembic -c config/alembic.ini upgrade head
```

### Migrations ultérieures
```bash
# Générer une nouvelle migration
alembic -c config/alembic.ini revision --autogenerate -m "Description du changement"

# Appliquer les migrations
alembic -c config/alembic.ini upgrade head
```

## ✅ Validation de la configuration

### Script de validation automatique
```bash
cd scripts/setup
python validate_postgresql.py
```

### Tests manuels
```bash
# Tester la connexion
python -c "
import psycopg2
try:
    conn = psycopg2.connect('postgresql://holbies_user:holbies_password@localhost:5432/holbies_db')
    print('✅ Connexion PostgreSQL réussie!')
    conn.close()
except Exception as e:
    print(f'❌ Erreur de connexion: {e}')
"
```

## 🚫 Interdictions

### ❌ Ce qui est INTERDIT :
- Utilisation de SQLite (`sqlite:///`)
- Fichiers `.db`, `.sqlite`, `.sqlite3`
- Configuration SQLite dans le code
- Variables d'environnement pointant vers SQLite

### ✅ Ce qui est OBLIGATOIRE :
- PostgreSQL uniquement (`postgresql://`)
- Configuration via variables d'environnement
- Utilisation de psycopg2 pour la connexion
- Validation automatique de la configuration

## 🔧 Dépannage

### Erreur de connexion PostgreSQL
1. Vérifier que PostgreSQL est démarré
2. Vérifier les credentials dans `.env`
3. Vérifier les permissions de l'utilisateur
4. Vérifier que le port 5432 est ouvert

### Erreur de migration Alembic
1. Vérifier la configuration dans `config/alembic.ini`
2. S'assurer que la base de données existe
3. Vérifier les permissions de l'utilisateur

### Docker ne démarre pas
1. Vérifier que Docker est installé et démarré
2. Vérifier les ports disponibles (5432, 8000)
3. Vérifier les volumes Docker

## 📚 Ressources

- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [SQLAlchemy + PostgreSQL](https://docs.sqlalchemy.org/en/14/dialects/postgresql.html)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [psycopg2 Documentation](https://www.psycopg.org/docs/)
