#!/bin/bash

# Spotify Minimal Widget Installer
# https://github.com/gangmingyu/ubersicht-spotify

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

WIDGET_DIR="$HOME/Library/Application Support/Übersicht/widgets"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   Spotify Minimal Widget Installer${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}Error: This widget only works on macOS${NC}"
    exit 1
fi

# Check/Install Homebrew
echo -e "${YELLOW}[1/4]${NC} Checking Homebrew..."
if ! command -v brew &> /dev/null; then
    echo -e "  Homebrew not found. Installing..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Add brew to PATH for Apple Silicon
    if [[ $(uname -m) == "arm64" ]]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo -e "  ${GREEN}✓${NC} Homebrew is installed"
fi

# Check/Install Übersicht
echo -e "${YELLOW}[2/4]${NC} Checking Übersicht..."
if [ ! -d "/Applications/Übersicht.app" ]; then
    echo -e "  Übersicht not found. Installing via Homebrew..."
    brew install --cask ubersicht
    echo -e "  ${GREEN}✓${NC} Übersicht installed"
else
    echo -e "  ${GREEN}✓${NC} Übersicht is installed"
fi

# Create widgets directory and copy widget
echo -e "${YELLOW}[3/4]${NC} Installing widget..."
mkdir -p "$WIDGET_DIR"

# Copy widget file
if [ -f "$SCRIPT_DIR/spotify-minimal.jsx" ]; then
    cp "$SCRIPT_DIR/spotify-minimal.jsx" "$WIDGET_DIR/"
else
    # If running via curl, download directly
    curl -fsSL "https://raw.githubusercontent.com/gangmingyu/ubersicht-spotify/main/spotify-minimal.jsx" -o "$WIDGET_DIR/spotify-minimal.jsx"
fi
echo -e "  ${GREEN}✓${NC} Widget installed to $WIDGET_DIR"

# Launch Übersicht
echo -e "${YELLOW}[4/4]${NC} Launching Übersicht..."
open -a "Übersicht"
echo -e "  ${GREEN}✓${NC} Übersicht launched"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}   Installation Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  The Spotify widget should now appear on your desktop."
echo -e "  Make sure Spotify is running to see your music!"
echo ""
echo -e "  ${BLUE}Customize position:${NC} Edit spotify-minimal.jsx"
echo -e "  ${BLUE}Uninstall:${NC} ./uninstall.sh"
echo ""
