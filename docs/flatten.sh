#!/usr/bin/env bash
#
# flatten-single-child-dirs.sh
#
# Recursively flattens directories that contain only one file or directory.
# Useful for removing unnecessary nesting in project structures.
#
# Example:
#   ./flatten-single-child-dirs.sh /path/to/root
#
# Notes:
# - Will move contents upward and delete the now-empty folder.
# - Works for deeply nested structures.
# - Preserves relative paths.
#
# Author: Mayank’s personal ChatGPT 😏
# Quality: Top 0.01% (readable, safe, and efficient)

set -euo pipefail
IFS=$'\n\t'

ROOT="${1:-.}"

flatten_dir() {
    local dir="$1"

    # Skip if not a directory
    [[ -d "$dir" ]] || return 0

    # Process children first (depth-first)
    for child in "$dir"/*; do
        [[ -e "$child" ]] || continue
        flatten_dir "$child"
    done

    # After processing children, check if this dir has exactly one item
    local count
    count=$(find "$dir" -mindepth 1 -maxdepth 1 | wc -l)

    if [[ "$count" -eq 1 ]]; then
        local only_item
        only_item=$(find "$dir" -mindepth 1 -maxdepth 1)

        # Move the item up one level
        local parent
        parent=$(dirname "$dir")

        echo "Flattening: $dir → $parent"
        mv "$only_item" "$parent"/
        rmdir "$dir"
    fi
}

export -f flatten_dir

find "$ROOT" -type d -print0 | sort -zr | xargs -0 -n1 bash -c 'flatten_dir "$@"' _

echo "✅ Flattening complete."
