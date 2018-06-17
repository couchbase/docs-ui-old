#!/bin/bash

git config --local user.name "OpenDevise Ops"
git config --local user.email ops@opendevise.com
git remote set-url origin https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git
git fetch --tags
CURRENT_VERSION=$(git tag -l v* --sort -v:refname | head -1 | sed s/^v//)
if [ -z $CURRENT_VERSION ]; then
  CURRENT_VERSION=0
fi
NEXT_VERSION=$((CURRENT_VERSION+1))
sed -i "s/^:revnumber: .*/:revnumber: $NEXT_VERSION/" README.adoc
git commit -m "Release version $NEXT_VERSION [skip ci]" README.adoc
git push origin master
git tag v$NEXT_VERSION
git push origin v$NEXT_VERSION
