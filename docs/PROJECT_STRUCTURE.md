# 📁 Structure du Projet - Holbies Learning Hub

Ce document explique la nouvelle organisation du projet après le refactoring.

## 🎯 Objectifs de la réorganisation

- ✅ **Séparation claire des responsabilités**
- ✅ **Meilleure maintenabilité**
- ✅ **Structure professionnelle**
- ✅ **Facilité de navigation**
- ✅ **Préparation pour les tests**

## 📂 Structure finale

```
project-holbies/
├── 🚀 CORE APPLICATION
│   ├── main.py              # Point d'entrée FastAPI
│   ├── requirements.txt     # Dépendances Python
│   ├── start.sh            # Script de démarrage
│   └── app/                # Code applicatif principal
│       ├── __init__.py
│       ├── auth.py         # Authentification
│       ├── database.py     # Configuration BDD
│       ├── models.py       # Modèles SQLAlchemy
│       ├── schemas.py      # Schémas Pydantic
│       └── routers/        # Routes API
│
├── 🎨 FRONTEND
│   ├── static/             # Ressources statiques
│   │   ├── css/           # Styles CSS
│   │   ├── js/            # JavaScript
│   │   ├── images/        # Images
│   │   └── video/         # Vidéos
│   └── templates/          # Templates Jinja2
│
├── 🗄️ DATABASE
│   ├── holbies.db         # Base de données SQLite
│   └── alembic/           # Migrations
│
├── 🛠️ SCRIPTS & UTILITIES
│   └── scripts/
│       ├── database/       # Scripts de gestion BDD
│       │   ├── init_db.py
│       │   ├── populate_db_balanced.py
│       │   ├── reset_db.py
│       │   ├── complete_reset_db.py
│       │   ├── force_reset_db.py
│       │   ├── sqlalchemy_reset.py
│       │   └── create_tables.py
│       ├── setup/          # Scripts de configuration
│       │   ├── create_admin.py
│       │   ├── create_test_user.py
│       │   └── test_installation.py
│       └── ai_quiz_corrector.py
│
├── ⚙️ CONFIGURATION
│   └── config/
│       ├── alembic.ini     # Config Alembic
│       └── docker-compose.yml
│
├── 🧪 TESTS & EXAMPLES
│   ├── tests/              # Tests unitaires (à développer)
│   └── examples/           # Prototypes et exemples
│       ├── badge/
│       ├── python_tutor/
│       └── question_code/
│
├── 📚 DOCUMENTATION
│   ├── docs/               # Documentation technique
│   ├── README.md           # Documentation principale
│   ├── INSTALL.md          # Guide d'installation
│   ├── IMPLEMENTATION_SUMMARY.md
│   └── VIDEO_INSTRUCTIONS.md
│
└── 🐳 DEPLOYMENT
    ├── Dockerfile
    ├── .env.example
    └── .gitignore
```

## 🔄 Changements effectués

### ✅ Scripts déplacés
- **Database scripts** : `scripts/database/`
- **Setup scripts** : `scripts/setup/`
- **AI corrector** : `scripts/ai_quiz_corrector.py`

### ✅ Configuration centralisée
- **Docker** : `config/docker-compose.yml`
- **Alembic** : `config/alembic.ini` (chemin mis à jour)

### ✅ Exemples organisés
- **test_template/** → **examples/**
- Ajout de documentation pour chaque exemple

### ✅ Tests préparés
- Dossier `tests/` créé avec structure recommandée
- README avec instructions pytest

## 🚀 Utilisation après réorganisation

### Scripts de base de données
```bash
# Depuis la racine du projet
python scripts/database/init_db.py
python scripts/database/populate_db_balanced.py
python scripts/database/reset_db.py
```

### Scripts de configuration
```bash
python scripts/setup/create_admin.py
python scripts/setup/create_test_user.py
python scripts/setup/test_installation.py
```

### Configuration Docker
```bash
docker-compose -f config/docker-compose.yml up -d
```

### Migrations Alembic
```bash
alembic -c config/alembic.ini revision --autogenerate -m "Description"
alembic -c config/alembic.ini upgrade head
```

## 📝 Prochaines étapes recommandées

1. **Tests** : Implémenter les tests unitaires dans `tests/`
2. **CI/CD** : Configurer GitHub Actions
3. **Documentation** : Compléter la documentation technique
4. **Monitoring** : Ajouter des logs et métriques
5. **Security** : Audit de sécurité et bonnes pratiques

## 🔗 Liens utiles

- [README principal](../README.md)
- [Guide d'installation](../INSTALL.md)
- [Scripts Database](../scripts/database/README.md)
- [Configuration](../config/README.md)
- [Exemples](../examples/README.md)
