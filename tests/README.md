# Tests

Ce dossier est destiné aux tests unitaires et d'intégration du projet Holbies Learning Hub.

## Structure recommandée

```
tests/
├── unit/           # Tests unitaires
│   ├── test_models.py
│   ├── test_auth.py
│   └── test_quiz.py
├── integration/    # Tests d'intégration
│   ├── test_api.py
│   └── test_database.py
├── fixtures/       # Données de test
└── conftest.py     # Configuration pytest
```

## Installation

Pour installer les outils de test :
```bash
pip install pytest pytest-asyncio httpx
```

## Usage

```bash
# Exécuter tous les tests
pytest tests/

# Exécuter les tests avec couverture
pytest tests/ --cov=app

# Exécuter des tests spécifiques
pytest tests/unit/test_models.py
```

## TODO
- [ ] Ajouter des tests unitaires pour les modèles
- [ ] Ajouter des tests d'intégration pour l'API
- [ ] Configurer la couverture de code
- [ ] Ajouter des tests pour le système AI Quiz
