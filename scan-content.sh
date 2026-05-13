#!/usr/bin/env bash
# scan-content.sh
#
# Scans content/presentations/ and content/videos/ for files and
# regenerates each folder's manifest.json so the website picks them
# up automatically.
#
# Usage:
#   ./scan-content.sh
#
# Existing manifest entries with the SAME file name are preserved,
# so any custom titles you wrote by hand stay intact. New files get
# an auto-derived title from the file name. Removed files are dropped.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PRESENTATION_EXT="pdf png jpg jpeg webp gif avif svg mp4 webm mov m4v"
VIDEO_EXT="mp4 webm mov m4v ogg"

# JSON-escape a string: backslash, double quote, control chars.
json_escape() {
  python3 -c '
import json, sys
sys.stdout.write(json.dumps(sys.argv[1], ensure_ascii=False))
' "$1"
}

# Derive a title from a filename: drop extension, replace _-. with spaces,
# trim whitespace. Used only when the manifest doesn't already have a title
# for that file.
derive_title() {
  local name="$1"
  # strip extension
  local base="${name%.*}"
  # underscores/dashes/dots -> space
  base="${base//_/ }"
  base="${base//-/ }"
  base="${base//./ }"
  # collapse multiple spaces
  base="$(echo "$base" | sed -E 's/[[:space:]]+/ /g; s/^ //; s/ $//')"
  echo "$base"
}

# Look up the existing title for a given file in the previous manifest.
# Echoes the raw JSON snippet (e.g. "Hello" or {"en":"...","tr":"..."})
# or an empty string if not found. Requires python3.
existing_title() {
  local manifest_path="$1"
  local file_name="$2"
  [ -f "$manifest_path" ] || { echo ""; return; }
  python3 - "$manifest_path" "$file_name" <<'PY'
import json, sys
path, fname = sys.argv[1], sys.argv[2]
try:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
except Exception:
    sys.exit(0)
items = data.get("items") if isinstance(data, dict) else data
if not isinstance(items, list):
    sys.exit(0)
for it in items:
    if isinstance(it, dict) and it.get("file") == fname and "title" in it:
        sys.stdout.write(json.dumps(it["title"], ensure_ascii=False))
        sys.exit(0)
PY
}

generate_manifest() {
  local folder="$1"
  local exts="$2"
  local dir="content/$folder"
  local out="$dir/manifest.json"

  if [ ! -d "$dir" ]; then
    echo "  (skip) $dir does not exist"
    return
  fi

  # Collect files in stable order.
  local files=()
  while IFS= read -r f; do
    files+=("$f")
  done < <(
    cd "$dir"
    for ext in $exts; do
      # nullglob via shopt for safety
      shopt -s nullglob nocaseglob
      for f in *."$ext"; do
        [ -f "$f" ] && echo "$f"
      done
      shopt -u nullglob nocaseglob
    done | sort -u
  )

  # Build JSON
  local tmp
  tmp="$(mktemp)"
  local count=${#files[@]}
  {
    echo '{'
    if [ "$count" -eq 0 ]; then
      echo '  "items": []'
    else
      echo '  "items": ['
      local i=0 last=$((count - 1))
      for f in "${files[@]}"; do
        local title_json
        title_json="$(existing_title "$out" "$f")"
        if [ -z "$title_json" ]; then
          title_json="$(json_escape "$(derive_title "$f")")"
        fi
        local file_json
        file_json="$(json_escape "$f")"
        local comma=","
        [ "$i" -eq "$last" ] && comma=""
        printf '    { "file": %s, "title": %s }%s\n' "$file_json" "$title_json" "$comma"
        i=$((i + 1))
      done
      echo '  ]'
    fi
    echo '}'
  } > "$tmp"

  mv "$tmp" "$out"
  echo "  wrote $out (${#files[@]} file$([ "${#files[@]}" -eq 1 ] || echo s))"
}

if ! command -v python3 >/dev/null 2>&1; then
  echo "error: python3 is required (used for safe JSON escaping)." >&2
  exit 1
fi

echo "Scanning content/ ..."
generate_manifest "presentations" "$PRESENTATION_EXT"
generate_manifest "videos"        "$VIDEO_EXT"
echo "Done."
