#!/bin/sh

# Update README
sed -i -e "s/mayank1513\/turborepo-template/$1\/$2/g" README.md
sed -i -e "s/@mayank1513\/fork-me/$2/g" README.md
sed -i -e "s/This is a template created based on official starter Turborepo./## Install\n\n\`\`\`bash\n$ pnpm add $2\n# or\n$ npm install $2\n# or\n$ yarn add $2\n\`\`\`/" README.md
sed -i -e "s/Simply click on \`Use this template\` .*//" README.md
sed -i -e "s/.*Clone this repo.*//" README.md

# Update forkme link in examples
sed -i -e "s/turbo-template/$2/g" examples/nextjs/app/layout.tsx
sed -i -e "s/turbo-template/$2/g" examples/nextjs/app/page.tsx
sed -i -e "s/turbo-template/$2/g" examples/vite/src/App.tsx

# Update package.json for all workspaces
sed -i -e "s/turborepo-template/$2/" package.json
cd packages/fork-me
sed -i -e "s/.*version.*/\t\"version\": \"0.0.0\",/" package.json
sed -i -e "s/.*name.*/\t\"name\": \"$2\",/" package.json
sed -i -e "s/mayank1513\/turborepo-template/$1\/$2/"
sed -i -e "s/\/tree\/main\/packages\/fork-me//"
# Update touchup.js to copy readme from root of the repo
sed -i -e "s/__dirname, \"README.md\"/__dirname, \"..\", \"..\", \"README.md\"/" touchup.js

cd ../../examples/nextjs
sed -i -e "s/.*version.*/\t\"version\": \"0.0.0\",/" package.json
sed -i -e "s/\"@mayank1513\/fork-me\"/\"@mayank1513\/fork-me\": \"latest\",\n\t\t\"$2\"/" package.json

cd ../vite
sed -i -e "s/.*version.*/\t\"version\": \"0.0.0\",/" package.json
sed -i -e "s/\"@mayank1513\/fork-me\"/\"@mayank1513\/fork-me\": \"latest\",\n\t\t\"$2\"/" package.json

# rename fork-me to repo-name
cd ../..
mv packages/fork-me packages/$2

# change working directory in publish workflow -- GitHub doesn't allow this
# sed -i -e "s/fork-me/$2/g" .github/workflows/publish.yml

# delete this file and the setup.yml workflow - no longer needed
rm .github/workflows/setup.yml
rm setup.sh
