#!/bin/bash
set -e

# Detect the active user's home directory inside the container
HOME_DIR="${HOME:-/home/vscode}"
TARGET_DIR="$HOME_DIR/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings"
TARGET_FILE="$TARGET_DIR/cline_mcp_settings.json"

echo "🔧 Setting up Cline MCP configuration..."

# Create the nested directory structure if it doesn't exist
mkdir -p "$TARGET_DIR"

# Copy settings active Cline settings location
if [ -f ".devcontainer/config/cline/cline-mcp-settings.json" ]; then
    cp ".devcontainer/config/cline/cline-mcp-settings.json" "$TARGET_FILE"
    echo "✅ MCP configuration successfully deployed to $TARGET_FILE"
else
    echo "❌ Error: .devcontainer/config/cline/cline-mcp-settings.json not found."
    exit 1
fi
