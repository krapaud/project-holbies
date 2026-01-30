#!/bin/bash
# Script de vérification du projet Holbies Learning Hub

echo "🔍 Vérification du projet Holbies Learning Hub"
echo "=============================================="
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteur d'erreurs
ERRORS=0

# 1. Vérifier la compilation Python
echo "1. Vérification de la syntaxe Python..."
COMPILE_OUTPUT=$(python -m py_compile main.py app/database.py app/auth.py app/models.py app/schemas.py 2>&1)
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Syntaxe Python valide"
else
    echo -e "${RED}✗${NC} Erreurs de syntaxe Python détectées"
    echo "$COMPILE_OUTPUT"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Vérifier les imports
echo "2. Vérification des imports..."
if python -c "
import sys
sys.path.insert(0, '.')
try:
    import main
    import app.database
    import app.auth
    import app.models
    import app.schemas
    print('OK')
except Exception as e:
    print(f'ERREUR: {e}')
    sys.exit(1)
" 2>/dev/null | grep -q "OK"; then
    echo -e "${GREEN}✓${NC} Tous les imports sont valides"
else
    echo -e "${YELLOW}⚠${NC} Certains imports nécessitent des dépendances (normal si pas d'environnement virtuel)"
fi
echo ""

# 3. Vérifier la structure des fichiers
echo "3. Vérification de la structure du projet..."
REQUIRED_FILES=(
    "main.py"
    "requirements.txt"
    "README.md"
    "app/__init__.py"
    "app/database.py"
    "app/models.py"
    "app/schemas.py"
    "app/auth.py"
    ".flake8"
    ".editorconfig"
)

ALL_PRESENT=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file manquant"
        ALL_PRESENT=false
        ERRORS=$((ERRORS + 1))
    fi
done

if [ "$ALL_PRESENT" = true ]; then
    echo -e "${GREEN}✓${NC} Tous les fichiers requis sont présents"
fi
echo ""

# 4. Vérifier requirements.txt
echo "4. Vérification des dépendances..."
if [ -f "requirements.txt" ]; then
    echo -e "${GREEN}✓${NC} requirements.txt présent"
    echo "  Dépendances principales :"
    grep -E "^(fastapi|uvicorn|sqlalchemy|psycopg)" requirements.txt | sed 's/^/    /'
else
    echo -e "${RED}✗${NC} requirements.txt manquant"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Vérifier la configuration flake8
echo "5. Vérification de la configuration..."
if [ -f ".flake8" ]; then
    echo -e "${GREEN}✓${NC} .flake8 configuré"
else
    echo -e "${YELLOW}⚠${NC} .flake8 non trouvé"
fi

if [ -f ".editorconfig" ]; then
    echo -e "${GREEN}✓${NC} .editorconfig configuré"
else
    echo -e "${YELLOW}⚠${NC} .editorconfig non trouvé"
fi
echo ""

# Résumé final
echo "=============================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Vérification réussie !${NC}"
    echo "Le projet est prêt à être utilisé."
    exit 0
else
    echo -e "${RED}❌ $ERRORS erreur(s) détectée(s)${NC}"
    echo "Veuillez corriger les erreurs ci-dessus."
    exit 1
fi
