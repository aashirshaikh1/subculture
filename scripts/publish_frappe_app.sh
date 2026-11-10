#!/usr/bin/env bash
# Build the `frappe-cloud` branch: this repo's Frappe app, in the shape Frappe
# Cloud installs from.
#
# Frappe Cloud clones a repository and expects the app at its root, with its
# pyproject.toml there. Here the app is one directory of the site's repo, so
# this script commits that directory's contents as the root of `frappe-cloud`.
# The app is self-contained — sync.py has already copied the site's HTML and
# scripts into it — so nothing else needs to travel with it.
#
# Run sync.py first if the site itself changed:
#   python3 build-local.py && python3 frappe_app/subculture_site/sync.py
#
#   scripts/publish_frappe_app.sh          # build the branch
#   scripts/publish_frappe_app.sh --push   # build it and push to origin
set -euo pipefail

BRANCH="frappe-cloud"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$(mktemp -d)"
INDEX="$(mktemp -d)/index"
trap 'rm -rf "$STAGE" "$(dirname "$INDEX")"' EXIT

cd "$ROOT"
source_sha="$(git rev-parse --short HEAD)"

# The tree Frappe Cloud will clone: the app directory, as the root.
cp -r frappe_app/subculture_site/. "$STAGE/"
rm -f "$STAGE/sync.py"   # a build tool for this repo; it has nothing to read there
find "$STAGE" -name '__pycache__' -type d -prune -exec rm -rf {} +
find "$STAGE" -name '*.pyc' -delete

# Commit it with plumbing, so no checkout of the branch is needed. Git on
# Windows wants native paths in these variables, not the shell's /c/... ones.
winpath() { if command -v cygpath >/dev/null 2>&1; then cygpath -m "$1"; else printf '%s' "$1"; fi; }
export GIT_DIR="$(git rev-parse --absolute-git-dir)"
export GIT_WORK_TREE="$(winpath "$STAGE")" GIT_INDEX_FILE="$(winpath "$INDEX")"
git add -A "$GIT_WORK_TREE"
tree="$(git write-tree)"

parent="$(git rev-parse --verify --quiet "refs/heads/$BRANCH" || true)"
if [ -n "$parent" ] && [ "$tree" = "$(git rev-parse "$parent^{tree}")" ]; then
	echo "$BRANCH is already built from the current sources."
else
	if [ -n "$parent" ]; then
		commit="$(git commit-tree "$tree" -p "$parent" -m "Build the Frappe Cloud app from $source_sha")"
	else
		commit="$(git commit-tree "$tree" -m "Build the Frappe Cloud app from $source_sha")"
	fi
	git update-ref "refs/heads/$BRANCH" "$commit"
	echo "Built $BRANCH at ${commit:0:9} from $source_sha."
fi

if [ "${1:-}" = "--push" ]; then
	git push origin "$BRANCH"
fi
