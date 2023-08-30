#!/bin/sh

# Update README
sed -i -e "s/mayank1513\/turborepo-template/$1\/$2/g" README.md
sed -i -e "s/@mayank1513\/fork-me/$2/g" README.md
sed -i -e "s/This is a template created based on official starter Turborepo./## Install\n\n\`\`\`bash\n$ pnpm add @$2\n# or\n$ npm install @$2\n# or\n$ yarn add @$2\n\`\`\`/" README.md
sed -i -e "s/Simply click on Use this template button to use and customize this template for your next JavaSctipt \/ TypeScript \/ React \/ Vue \/ Next.js library or project.//" README.md

# Update package.json for all workspaces
cd packages/fork-me
sed -i -e "s/.*version.*/\"version\": \"0.0.0\"/" package.json
sed -i -e "s/.*name.*/\"name\": \"$2\"/" package.json
# Update touchup.js to copy readme from root of the repo
sed -i -e "s/__dirname, \"README.md\"/__dirname, \"..\", \"..\", \"README.md\"/" touchup.js

cd ../../examples/nextjs
sed -i -e "s/.*version.*/\"version\": \"0.0.0\"/" package.json
sed -i -e "s/.*@mayank1513\/fork-me\":.*/\"$2\": \"0.0.0\"/" package.json

cd ../docs
sed -i -e "s/.*version.*/\"version\": \"0.0.0\"/" package.json
sed -i -e "s/.*@mayank1513\/fork-me\":.*/\"$2\": \"0.0.0\"/" package.json

# delete this file and the setup.yml workflow - no longer needed
rm .github/workflows/setup.yml
rm setup.sh
