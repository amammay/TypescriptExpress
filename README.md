# TypescriptExpress

## CI Status
![](https://github.com/amammay/TypescriptExpress/workflows/Node%20CI/badge.svg)

## About
Get up and running with a express server written in typescript that is packed with a handful of goodies like IOC
principles, Winston logging, JOI validation, Unit Test, and Integration test.


## Tech Stack Check List

- Typescript
- Express
- Swagger
    - Swagger UI
- dotenv
- JOI validation
- Morgan
- Jest Unit Test
- Newman (Postman Integration Test)
- Docker


## Getting Started

1. Run `npm i` to install the dependencies
1. Run `npm run dev` to get a local dev server spun up on port 3000, you can verify its up and running by visiting http://localhost:3000/api-docs/swagger/
1. Run `npm test` to run the unit test and print out the coverage of the project
    1. Test can be put into watch mode by running `npm run test:watch`
1. Run `npm run test:it` to run the newman collection runner (if already running the dev server you can just run `npm run newman:local`)


