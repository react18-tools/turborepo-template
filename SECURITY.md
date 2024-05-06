# Security Policy

## Version Support

We provide support for the latest minor version. Pull requests aimed at fixing security vulnerabilities in the version immediately preceding the latest will be considered. Support for versions prior to this relies entirely on community-driven pull requests.

| Version | Support Status     |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |
| 0.0.x   | :warning:          |
| < 0.0   | :x:                |

## Patching Long-Term Support (LTS) Versions

If you rely on a previous minor version of TypeDoc and need to address security issues, kindly submit a pull request to the `lts` branch. Upon merge, your patch will automatically trigger the publication of a new version.

Ensure to update the version field in `package.json`.

Note: We only accept pull requests addressing security vulnerabilities. Additional functionalities and bug fixes for older versions are beyond the scope.

## Reporting Vulnerabilities

Kindly report vulnerabilities [here](https://github.com/react18-tools/turborepo-template/security/advisories/new).
