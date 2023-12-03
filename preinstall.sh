#!/bin/sh
url=$(git remote get-url --push origin | sed "s/https:\/\/github.com\///" | sed "s/.git//")
repo=$(sed "s/.*\///" <<< $url)
owner=$(sed "s/\/.*//" <<< $url)

# change working directory in publish workflow -- GitHub doesn't allow this in actions
sed -i -e "s/fork-me/$repo/g" .github/workflows/publish.yml
sed -i -e "s/react18-tools/$owner/g" .github/workflows/publish.yml
sed -i -e "s/fork-me/$repo/g" .github/workflows/test.yml
sed -i -e "/if:/d" .github/workflows/test.yml

# Remove preinstall script from package.json
sed -i "/preinstall/d" package.json
sed -i -e "s/}\\\\\"\",/}\\\\\"\"/" package.json
rm preinstall.sh

# Create git commit
git add .
git commit -m "change working directory in publish workflow [skip ci]"
