# Back-end

## Requirements

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Installation

Run `npm install` to install every dependency.

### Database

Ensure you have a database and create the tables at the `init.sql` file, for example:

```
CREATE DATABASE `node_teleport`;
USE `node_teleport`;
SOURCE init.sql
```

### Required environment variables

Add the following variables to your `.env` file:

- `SECRET`: Secret string used by JWT.
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `IPINFO_TOKEN`: API token from [IPinfo](https://ipinfo.io/).

### Building the frontend

Run `npm run build` to compile the frontend.

## Development

Run `npm run dev` to start a local development version of the application.

## Running the application

To start the application run `npm run start`.