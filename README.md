
## Description

Test task for Back-end Developer fans-crm.com 

## Installation

```bash
$ npm install
```
## Set local environment

Copy .env.example file to .env and make the necessary changes there

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API

You can use postman and fansCRM.postman_collection.json for test api
#### auth

Get token

```Shell
POST /api/v1/get-token/:userID
```
#### user

```Shell
POST /api/v1/add-user
{ 
  email: string
  password: string
  name: string
  phone?: string
}
```

```Shell

GET /api/v1/user/ - get all users
GET /api/v1/get-user/:userID - get user 'userID'
```
