#! /bin/sh -e
# to be run on malibu
# Pull the latest master from malibu and malibu-advanced
# Create a new branch in malibu-advanced
# Then run the bash script: bash diff.sh <malibu-commit-sha-that-needs-to-go-to-malibu-advanced>

git log -m -1 --name-only --pretty="format:" "$1" >> files-changed.txt
ADVANCED_PATH="$(
  cd ..
  cd "malibu-advanced"
  pwd
)"

BASE_PATH="$(
  cd ..
  cd "malibu"
  pwd
)"

if ! brew ls --versions colordiff; then
  brew install colordiff
fi

filename="files-changed.txt"
n=1
while read line; do
  # reading each line
  echo "==================start":$line
  diff $BASE_PATH/$line $ADVANCED_PATH/$line | colordiff
  echo "==================end":$line
  n=$((n + 1))
done <$filename
git clean -f files-changed.txt
