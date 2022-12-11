# pwdb Server
> MAKE IT WORK - MAKE IT RIGHT - MAKE IT FAST

## ToDos until 1.0.0
- Enable DB Migrations when base setup is done
- Dockerize
- Use another DB and not sqlite
- more stuff i dont know yet. maybe you know?

## Setup

0. `npm i -g yarn` Install Yarn
1. `yarn install` Install Packages
2. `cp .env.exampe .env` Edit Variables. If you need more Help look below the Setup Section
2. `yarn postinstall`
3. `yarn telemetry-disable` Opt out of telemetry before first start 
4. `yarn dev` start keystone server
5. Go to your Backend URL and do the first time Setup for the Admin User.

### Setup Help

#### `dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64 | tr -d -- '\n' | tr -- '+/' '-_'; echo`
Generate a Cookie Secret in bash

#### `file:./keystone.db`
Use this Database Url if nothing else is specified. Check `./keystone.ts` if your provider is set to sqlite.
If you use another database url you will need to Change the Provider. Keystone does support postgres, mysql and sqlLite

#### `http://localhost:3000`
This is the base Url on the pwdb Client

#### `yarn keystone postinstall --fix`
If you get angry outputs try this and generate missing prisma and graphql schemas

## Available Scripts
In the project directory, you can run:

### [Keystone CLI Doku](https://keystonejs.com/docs/guides/cli)

### `yarn dev`
Start the Game in Production Mode
> Keystone does not currently watch your local files for changes. If you update the config, schema or any other files in your keystone project you'll need to restart the server.

### `yarn postinstall`
generate client APIs and types (optinal --fixf flag when files are missing)

### `yarn build`
Build the project (must be done before using start)

### `yarn deploy`
Build and Prisma Migration Deploy

### `yarn start`
Start the project in production mode

### `yarn prisma [command]`
Run Prisma CLI commands safely

### `yarn test`
Run Tests

### `yarn telemetry-disable`
Disable Telemetry for your development. Is disabled automaticly in production

### `yarn seed-data`
Add Sample Data

## MISC

### [`npm i -g npm-check-updates`](https://www.npmjs.com/package/npm-check-updates)
Install this and check with ncu package versions