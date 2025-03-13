# Back-end

## Requirements

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Installation

Ensure you install every dependency by running `npm install`.

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