# Scripts

Ce dossier contient tous les scripts utilitaires du projet Holbies Learning Hub.

## Structure

### 📁 database/
Scripts liés à la gestion de la base de données :
- `init_db.py` - Initialisation de la base de données
- `create_tables.py` - Création des tables
- `populate_db_balanced.py` - Population avec des données équilibrées
- `reset_db.py` - Reset standard de la base de données
- `complete_reset_db.py` - Reset complet avec suppression totale
- `force_reset_db.py` - Reset forcé en cas de problème
- `sqlalchemy_reset.py` - Reset via SQLAlchemy

### 📁 setup/
Scripts de configuration et d'installation :
- `create_admin.py` - Création d'un utilisateur administrateur
- `create_test_user.py` - Création d'utilisateurs de test
- `test_installation.py` - Test de l'installation du projet

### 🔧 Utilitaires
- `ai_quiz_corrector.py` - Correcteur de quiz basé sur l'IA

## Usage

Pour exécuter un script depuis la racine du projet :
```bash
python scripts/database/init_db.py
python scripts/setup/create_admin.py
```

## Notes
- Assurez-vous que l'environnement virtuel est activé
- Vérifiez que les variables d'environnement sont configurées
- Consultez le README principal pour les prérequis
