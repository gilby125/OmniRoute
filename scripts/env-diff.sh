#!/bin/bash
# ------------------------------------------------------------------------------
# OmniRoute — Env Diff Utility
# Compare your local .env against .env.example to find new/removed variables
# ------------------------------------------------------------------------------

ENV_FILE="${1:-.env}"
EXAMPLE_FILE="${2:-.env.example}"

if [ ! -f "$ENV_FILE" ]; then
  # Try finding it in the data volume
  if [ -f "./data/.env" ]; then
    ENV_FILE="./data/.env"
  else
    echo "❌ Error: $ENV_FILE not found."
    exit 1
  fi
fi

if [ ! -f "$EXAMPLE_FILE" ]; then
  echo "❌ Error: $EXAMPLE_FILE not found."
  exit 1
fi

echo "🔍 Comparing $ENV_FILE against $EXAMPLE_FILE..."
echo ""

# Get keys from both files
GET_KEYS="grep -E '^[A-Z0-9_]+=' | cut -d= -f1 | sort"

# New vars in upstream (present in example but missing in env)
NEW_VARS=$(comm -23 <(eval "cat $EXAMPLE_FILE | $GET_KEYS") <(eval "cat $ENV_FILE | $GET_KEYS"))

if [ -n "$NEW_VARS" ]; then
  echo "✨ New variables added upstream (you should add these to your .env):"
  for var in $NEW_VARS; do
    echo "  [+] $var"
  done
else
  echo "✅ No new variables found in upstream."
fi

echo ""

# Vars removed upstream (present in env but missing in example)
REMOVED_VARS=$(comm -13 <(eval "cat $EXAMPLE_FILE | $GET_KEYS") <(eval "cat $ENV_FILE | $GET_KEYS"))

if [ -n "$REMOVED_VARS" ]; then
  echo "🗑️  Variables removed upstream (potentially deprecated):"
  for var in $REMOVED_VARS; do
    echo "  [-] $var"
  done
fi

echo ""
echo "💡 Tip: Always keep your secrets in .env and check this diff after pulling upstream releases."
