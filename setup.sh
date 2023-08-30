#!/bin/sh
sed -i -e "s/mayank1513\/turbo-template/$1\/$2/g" README.md
sed -i -e "s/@mayank1513\/fork-me/$1\/$2/g" README.md
sed -i -e "s/This is a template created based on official starter Turborepo./## Install\n\n\`\`\`bash\n$ pnpm add @$1\/$2\n# or\n$ npm install @$1\/$2\n# or\n$ yarn add @$1\/$2\n\`\`\`/" README.md
sed -i -e "s/Simply click on Use this template button to use and customize this template for your next JavaSctipt \/ TypeScript \/ React \/ Vue \/ Next.js library or project.//" README.md

# delete this file and the setup.yml workflow - no longer needed
rm .github/workflows/setup.yml
rm setup.sh
