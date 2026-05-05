# Project File Quiz Notes

## node_modules/
Contains installed third-party libraries used by the project.

☑️ Do not edit

## tests/
Contains test files that check application behavior using Playwright.

☑️ This is where you work

## example.spec.ts
A sample Playwright test file demonstrating how tests are written and executed.

☑️ You will edit or replace this

## gitignore
Specifies files and folders that Git should ignore (like node_modules).

☑️ You may edit

## package-lock.json
Locks exact versions of installed dependencies for consistency.

☑️ Do not edit manually

## package.json
Defines project metadata, dependencies, and scripts.

☑️ You may edit (add scripts/packages)

### <u>Week 2</u> exercise - package.json
devDependencies:
- @playwright/test: ^1.59.1
- @types/node: ^25.6.0

Meaning: 
These are development tools.

@Playwright/test - used for writing and running tests

@types/node - helps TypeScript understand Node.js environment

## playwright.config.ts
Configures Playwright settings like browsers, timeouts, and base URL.

☑️ You edit this when setting up the framework
