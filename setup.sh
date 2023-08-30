#!/bin/sh

# Update README
sed -i -e "s/mayank1513\/turborepo-template/$1\/$2/g" README.md
sed -i -e "s/@mayank1513\/fork-me/$2/g" README.md
sed -i -e "s/This is a template created based on official starter Turborepo./## Install\n\n\`\`\`bash\n$ pnpm add @$2\n# or\n$ npm install @$2\n# or\n$ yarn add @$2\n\`\`\`/" README.md
sed -i -e "s/Simply click on Use this template button to use and customize this template for your next JavaSctipt \/ TypeScript \/ React \/ Vue \/ Next.js library or project.//" README.md

# Update package.json for all workspaces

# delete this file and the setup.yml workflow - no longer needed
rm .github/workflows/setup.yml
rm setup.sh
