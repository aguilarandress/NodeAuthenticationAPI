# Node authentication API

> Node.js and MongoDB API for authentication with JSON Web Tokens

## Quick start

### Installing the dependencies

```bash
$ npm install
```

### Run server for development

```bash
$ npm run server # Runs on http://localhost:5000
```

### Run server

```bash
$ npm start
```

## Database connection

To connect to MongoDB you need to create a `config.env` file in the `/config` directory of the project. The file should have a format like
this:

```
MONGO_URI=YOUR_CONNECTION_STRING
NODE_ENV=development
SECRET_KEY=MYSECRETKEY
```

## API endpoints

- `POST /api/users/`: Registers a new user

- `POST /api/auth/`: Authenticates user and generates token

- `GET /api/auth/current`: Gets current user (requires json web token)

## User registration

Send POST request to `/api/users/` with a JSON body like this:

```JSON
{
  "email": "email@email.com",
  "username": "yourusername",
  "password": "123456"
}
```

## User authentication

Send POST request to `/api/auth` with a JSON body like this:

```JSON
{
  "email": "email@email.com",
  "password": "123456"
}
```

## Protected routes

For protected routes you need to add your token to the `Authorization` HTTP header.

For example:

```
Authorization: Bearer YOUR_TOKEN
```

## Application info

### Version

1.0.0

### Author

Andres Aguilar Moya
