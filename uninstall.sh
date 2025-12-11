#!/bin/bash

# Spotify Minimal Widget Uninstaller

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

WIDGET_FILE="$HOME/Library/Application Support/Übersicht/widgets/spotify-minimal.jsx"

echo ""
echo -e "${YELLOW}Uninstalling Spotify Minimal Widget...${NC}"
echo ""

if [ -f "$WIDGET_FILE" ]; then
    rm "$WIDGET_FILE"
    echo -e "${GREEN}✓${NC} Widget removed successfully"
    echo ""
    echo "  Note: Übersicht was not removed."
    echo "  To remove Übersicht: brew uninstall --cask ubersicht"
else
    echo -e "${RED}Widget not found at:${NC}"
    echo "  $WIDGET_FILE"
fi

echo ""
