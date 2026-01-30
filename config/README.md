# Configuration

Ce dossier contient les fichiers de configuration du projet.

## Fichiers

### 🐳 Docker
- `docker-compose.yml` - Configuration Docker Compose pour l'environnement de développement

### 🔄 Alembic
- `alembic.ini` - Configuration pour les migrations de base de données avec Alembic

## Usage

### Docker
```bash
# Depuis la racine du projet
docker-compose -f config/docker-compose.yml up -d
```

### Alembic
```bash
# Utiliser alembic avec le fichier de config
alembic -c config/alembic.ini revision --autogenerate -m "Description"
alembic -c config/alembic.ini upgrade head
```

## Notes
- Le fichier `alembic.ini` peut nécessiter des ajustements de chemins
- Vérifiez les variables d'environnement avant d'utiliser Docker
