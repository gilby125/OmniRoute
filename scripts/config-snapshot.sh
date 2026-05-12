#!/bin/bash
# ------------------------------------------------------------------------------
# OmniRoute — Config Snapshot Utility
# Backup/Restore your entire configuration via the internal API
# ------------------------------------------------------------------------------

ACTION="${1:-backup}"
SNAPSHOT_DIR="./data/config-snapshots"
mkdir -p "$SNAPSHOT_DIR"

# Try to get API URL and Port from env
PORT="${PORT:-20128}"
BASE_URL="${NEXT_PUBLIC_BASE_URL:-http://localhost:$PORT}"

case $ACTION in
  backup)
    TIMESTAMP=$(date +%Y%m%d-%H%M%S)
    FILE="$SNAPSHOT_DIR/config-$TIMESTAMP.json"
    
    echo "📦 Creating configuration snapshot..."
    # We use -k to ignore SSL cert issues if local HTTPS is used
    # This requires the app to be running.
    RESPONSE=$(curl -s -k -w "%{http_code}" "$BASE_URL/api/settings/export-json" -o "$FILE")
    
    if [ "$RESPONSE" == "200" ]; then
      echo "✅ Snapshot saved to: $FILE"
    else
      echo "❌ Error: Failed to create snapshot (HTTP $RESPONSE). Is OmniRoute running at $BASE_URL?"
      rm -f "$FILE"
      exit 1
    fi
    ;;
  
  list)
    echo "📋 Available snapshots in $SNAPSHOT_DIR:"
    ls -lh "$SNAPSHOT_DIR"/*.json 2>/dev/null || echo "  (None)"
    ;;

  *)
    echo "Usage: $0 [backup|list]"
    exit 1
    ;;
esac
